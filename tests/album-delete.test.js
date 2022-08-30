const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('delete album', () => {
  let db;
  let artists;
  let albums;

  beforeEach(async () => {
    try {
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
    describe('DELETE', () => {
      it('deletes a single album with the correct id', async () => {
        const album = albums[0];
        const res = await request(app).delete(`/album/${album.id}`).send();

        expect(res.status).to.equal(200);

        const [[deletedAlbumRecord]] = await db.query(
          'SELECT * FROM Album WHERE id = ?',
          [album.id]
        );

        expect(!!deletedAlbumRecord).to.be.false;
      });

      it('returns a 404 if the album is not in the database', async () => {
        const res = await request(app).delete('/album/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });
});
