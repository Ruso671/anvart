# Lienzos Backend (ready-to-deploy)
Proyecto API para gestionar pedidos de lienzos personalizados.

## Estructura
- `server.js` - punto de entrada
- `routes/` - endpoints organizados (products, orders, payments)
- `utils/` - helpers para DB y tickets
- `uploads/` - archivos subidos (comprobantes)
- `db.json` - base de datos JSON ligera

## Ejecutar local (Si puedes instalar Node)
1. `npm install`
2. `cp .env.example .env` y ajustar si quieres
3. `npm start`
4. Abrir `http://localhost:4000`

## Ejecutar sin instalar en tu PC (opciones)
- **Glitch** / **Replit**: importa el repo de GitHub y se desplegará.
- **Render** / **Fly**: conectar repo y desplegar servicio Node.

## Endpoints
- `GET /api/products`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id/status`
- `POST /api/payments/:id/upload-proof` (form-data file)

## Notas
- El proyecto está pensado para desplegar en plataformas cloud si no puedes instalar Node localmente.
