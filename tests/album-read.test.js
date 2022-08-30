const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read album', () => {
  let db;
  let artists;
  let albums;

  beforeEach(async () => {
    try {
      db = await getDb();
      const newArtists = await Promise.all([
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
      // console.log(newArtists, artists);
      await Promise.all([
        db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
          'News of the world',
          '1977',
          artists[0].insertId,
        ]),
        db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
          'Woodface',
          '1991',
          artists[1].insertId,
        ]),
        db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
          'Time on Earth',
          '2007',
          artists[2].insertId,
        ]),
      ]);

      [albums] = await db.query('SELECT * from Album');
    } catch (err) {
      console.log(err);
    }
  });

  afterEach(async () => {
    try {
      await db.query('DELETE FROM Artist');
      await db.query('DELETE FROM Album');
      await db.end();
    } catch (err) {
      console.log(err);
    }
  });

  describe('/album/:albumId', () => {
    describe('GET', () => {
      it('returns a single album with the correct id', async () => {
        const expected = albums[0];
        const res = await request(app).get(`/album/${expected.id}`).send();

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(expected);
      });

      it('returns a 404 if the album is not in the database', async () => {
        const res = await request(app).get('/album/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });

  describe('/album', () => {
    describe('GET', () => {
      it('returns all album records in the database', async () => {
        const res = await request(app).get('/album').send();

        expect(res.status).to.equal(200);
        console.log(res.body);
        expect(res.body.length).to.equal(3);

        res.body.forEach((albumRecord) => {
          const expected = albums.find((a) => a.id === albumRecord.id);
          console.log(albumRecord + ' ' + expected);
          expect(albumRecord).to.deep.equal(expected);
        });
      });
    });
  });
});
