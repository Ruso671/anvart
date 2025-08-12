const express = require('express');
const router = express.Router();
const { db, initDb } = require('../utils/db');

router.get('/', async (req, res) => {
  await initDb();
  res.json(db.data.products || []);
});

module.exports = router;
