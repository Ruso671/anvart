const express = require('express');
const router = express.Router();
const { db, initDb } = require('../utils/db');
const { generateTicketId } = require('../utils/ticket');
const { nanoid } = require('nanoid');

router.post('/', async (req, res) => {
  await initDb();
  const { customerName, email, items, note } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Debe incluir al menos un producto.' });
  }

  let total = 0;
  const enrichedItems = items.map(it => {
    const product = db.data.products.find(p => p.id === it.productId) || { base_price: 0 };
    const width = Number(it.width) || 0;
    const height = Number(it.height) || 0;
    const area = (width / 100) * (height / 100) || 0.01;
    const price = Math.round(product.base_price * area) * (Number(it.quantity) || 1);
    total += price;
    return { ...it, price };
  });

  const ticketId = generateTicketId(db.data.orders || []);
  const order = {
    id: nanoid(10),
    ticketId,
    customerName: customerName || '',
    email: email || '',
    items: enrichedItems,
    total,
    status: 'PENDIENTE',
    createdAt: new Date().toISOString(),
    note: note || ''
  };

  db.data.orders.push(order);
  await db.write();

  res.json(order);
});

router.get('/', async (req, res) => {
  await initDb();
  const { email } = req.query;
  if (email) {
    return res.json((db.data.orders || []).filter(o => o.email === email));
  }
  res.json(db.data.orders || []);
});

router.get('/:id', async (req, res) => {
  await initDb();
  const order = (db.data.orders || []).find(o => o.id === req.params.id || o.ticketId === req.params.id);
  if (!order) return res.status(404).json({ error: 'Pedido no encontrado' });
  res.json(order);
});

router.put('/:id/status', async (req, res) => {
  await initDb();
  const { status } = req.body;
  const order = (db.data.orders || []).find(o => o.id === req.params.id || o.ticketId === req.params.id);
  if (!order) return res.status(404).json({ error: 'Pedido no encontrado' });
  order.status = status;
  await db.write();
  res.json(order);
});

module.exports = router;
