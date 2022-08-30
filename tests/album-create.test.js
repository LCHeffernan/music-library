const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album', () => {
  let db;
  let artists;
  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Queen',
        'rock',
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Kylie Minogue',
        'pop',
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Dave Brubeck',
        'jazz',
      ]),
    ]);

    [artists] = await db.query('SELECT * from Artist');
  });

  afterEach(async () => {
    await db.query('DELETE FROM Album');
    await db.end();
  });

  describe('/artist/:artistId/album', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
        const name = 'News of the World';
        const year = 1977;
        const expected = artists[0];
        const res = await request(app)
          .post(`/artist/${expected.id}/album`)
          .send({
            name,
            year,
          });
        expect(res.status).to.equal(201);
        const [[albumEntries]] = await db.query(
          `SELECT * FROM Album WHERE name = '${name}'`
        );

        expect(albumEntries.name).to.equal(name);
        expect(albumEntries.year).to.equal(year);
        expect(albumEntries.artistId).to.equal(expected.id);
      });
    });
  });
});
