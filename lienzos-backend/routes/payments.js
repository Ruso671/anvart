const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const { db, initDb } = require('../utils/db');

const router = express.Router();
const uploadsDir = path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/:id/upload-proof', upload.single('file'), async (req, res) => {
  await initDb();
  const order = (db.data.orders || []).find(o => o.id === req.params.id || o.ticketId === req.params.id);
  if (!order) return res.status(404).json({ error: 'Pedido no encontrado' });

  const payment = {
    id: nanoid(8),
    orderId: order.id,
    amount: order.total,
    method: req.body.method || 'Nequi',
    proofUrl: req.file ? `/uploads/${req.file.filename}` : null,
    confirmed: false,
    createdAt: new Date().toISOString()
  };

  db.data.payments.push(payment);
  await db.write();

  res.json({ payment });
});

module.exports = router;
