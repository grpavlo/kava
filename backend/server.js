import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let inventory = [
  { id: 1, name: 'Coffee beans', unit: 'kg', qty: 0, minQty: 1 },
  { id: 2, name: 'Milk', unit: 'l', qty: 0, minQty: 2 }
];

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/auth/login', (req, res) => {
  const { username, role } = req.body;
  res.json({ token: 'dummy-token', username, role });
});

app.get('/inventory', (req, res) => {
  res.json(inventory);
});

app.post('/inventory/arrival', (req, res) => {
  const { id, qty } = req.body;
  const item = inventory.find(i => i.id === id);
  if (item) {
    item.qty += qty;
    return res.json(item);
  }
  res.status(404).json({ error: 'Item not found' });
});

app.post('/inventory/consume', (req, res) => {
  const { id, qty } = req.body;
  const item = inventory.find(i => i.id === id);
  if (item) {
    item.qty -= qty;
    return res.json(item);
  }
  res.status(404).json({ error: 'Item not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
