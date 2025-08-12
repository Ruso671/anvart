require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const paymentsRoute = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Carpeta de uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// Rutas
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/payments', paymentsRoute);

// Ruta por defecto
app.get('/', (req, res) => {
  res.send('📦 API de pedidos de lienzos funcionando correctamente.');
});

// Ruta para errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Servidor
app.listen(PORT, () => console.log(`✅ Backend en http://localhost:${PORT}`));
