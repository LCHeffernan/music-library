const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create artist', () => {
  let db;
  beforeEach(async () => (db = await getDb()));

  afterEach(async () => {
    await db.query('DELETE FROM Artist');
    await db.end();
  });

  describe('/artist', () => {
    describe('POST', () => {
      it('creates a new artist in the database', async () => {
        const name = 'Tame Impala';
        const genre = 'rock';
        const res = await request(app).post('/artist').send({
          name,
          genre,
        });

        expect(res.status).to.equal(201);

        const [[artistEntries]] = await db.query(
          `SELECT * FROM Artist WHERE name = '${name}'`
        );

        expect(artistEntries.name).to.equal(name);
        expect(artistEntries.genre).to.equal(genre);
      });
    });
  });
});
