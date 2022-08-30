const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const { name, year } = req.body;
  const { artistId } = req.params;

  const [[checkArtistExists]] = await db.query(
    'SELECT * from Artist WHERE id = ?',
    [artistId]
  );
  if (!checkArtistExists) {
    res.sendStatus(404);
  } else {
    try {
      await db.query(
        'INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)',
        [name, year, artistId]
      );
      res.sendStatus(201);
    } catch (err) {
      console.log('an error has occured' + err);
      res.sendStatus(500);
    }
  }
  await db.end();
};

exports.read = async (req, res) => {
  const { albumId } = req.params;
  const db = await getDb();
  const [[checkAlbumExists]] = await db.query(
    'SELECT * from Album WHERE id = ?',
    [albumId]
  );

  try {
    if (!albumId) {
      const [albums] = await db.query('SELECT * from Album');
      res.status(200).json(albums);
    } else if (!checkAlbumExists) {
      res.sendStatus(404);
    } else {
      const [[album]] = await db.query('SELECT * from Album WHERE id = ?', [
        albumId,
      ]);
      if (album) {
        res.status(200).json(album);
      } else {
        res.sendStatus(404);
      }
    }
  } catch (err) {
    res.sendStatus(500);
  }
  await db.end();
};

exports.update = async (req, res) => {
  const { albumId } = req.params;
  const data = req.body;

  const db = await getDb();

  try {
    const [{ affectedRows }] = await db.query(
      'UPDATE Album SET ? WHERE id = ?',
      [data, albumId]
    );

    if (affectedRows) {
      res.status(200).send();
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(500);
  }
  await db.end();
};

exports.destroy = async (req, res) => {
  const { albumId } = req.params;
  const db = await getDb();

  try {
    const [{ affectedRows }] = await db.query(
      'DELETE FROM Album WHERE id = ?',
      [albumId]
    );
    if (affectedRows) {
      res.status(200).json(affectedRows);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};
