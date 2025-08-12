function generateTicketId(orders) {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const seq = String((orders.length % 10000) + 1).padStart(4, '0');
  return `LNC-${y}${m}${d}-${seq}`;
}

module.exports = { generateTicketId };
