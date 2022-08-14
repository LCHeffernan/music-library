const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const { name, year } = req.body;
  const { artistId } = req.params;
  console.log(`${name}, ${year}, ${artistId}`);

  try {
    const dbEntry = await db.query('INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)', [
      name,
      year,
      artistId
    ]);
    console.log(dbEntry);
    res.sendStatus(201);
  } catch (err) {
    console.log('an error has occured' + err);
    res.sendStatus(500);
  }

  await db.end();
};