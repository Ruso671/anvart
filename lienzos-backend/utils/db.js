const { Low, JSONFile } = require('lowdb');
const path = require('path');

const dbFile = path.join(process.cwd(), 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

async function initDb() {
  await db.read();
  db.data = db.data || { users: [], products: [], orders: [], payments: [] };
  if (!db.data.products || db.data.products.length === 0) {
    db.data.products = [
      { id: 'p_algod', name: 'Algodón', base_price: 20000, options: ['Enmarcado', 'Sin marco', 'Barnizado'] },
      { id: 'p_lino', name: 'Lino', base_price: 35000, options: ['Enmarcado', 'Sin marco', 'Barnizado'] },
      { id: 'p_sint', name: 'Sintético', base_price: 15000, options: ['Sin marco', 'Barnizado'] }
    ];
    await db.write();
  }
  return db;
}

module.exports = { db, initDb };
