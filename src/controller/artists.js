const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const { name, genre } = req.body;

  try {
    await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
      name,
      genre,
    ]);

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }

  await db.end();
};

exports.read = async (req, res) => {
  const { artistId } = req.params;
  const db = await getDb();

  try {
    if (!artistId) {
      const [artists] = await db.query('SELECT * from Artist');
      res.status(200).json(artists);
    } else {
      const [[artist]] = await db.query('SELECT * from Artist WHERE id = ?', [
        artistId,
      ]);
      if (artist) {
        res.status(200).json([artist]);
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
  const { artistId } = req.params;
  const data = req.body;

  const db = await getDb();

  try {
    const [{ affectedRows }] = await db.query(
      'UPDATE Artist SET ? WHERE id = ?',
      [data, artistId]
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
  const { artistId } = req.params;
  const db = await getDb();

  try {
    const [{ affectedRows }] = await db.query(
      'DELETE FROM Artist WHERE id = ?',
      [artistId]
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
