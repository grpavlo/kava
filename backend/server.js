import express from 'express';
import cors from 'cors';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://postgres:postgres@localhost:5432/kava',
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS inventory (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      unit TEXT NOT NULL,
      qty NUMERIC DEFAULT 0,
      "minQty" NUMERIC DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS inventory_log (
      id SERIAL PRIMARY KEY,
      item_id INTEGER REFERENCES inventory(id),
      change NUMERIC NOT NULL,
      reason TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);
  const { rows } = await pool.query('SELECT COUNT(*) FROM inventory');
  if (Number(rows[0].count) === 0) {
    await pool.query(
      `INSERT INTO inventory (name, unit, qty, "minQty") VALUES
        ('Coffee beans', 'kg', 0, 1),
        ('Milk', 'l', 0, 2)`
    );
  }
}
initDb().catch((err) => {
  console.error('DB init failed', err);
  process.exit(1);
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/auth/login', (req, res) => {
  const { username, role } = req.body;
  res.json({ token: 'dummy-token', username, role });
});

app.get('/inventory', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, name, unit, qty::float AS qty, "minQty"::float AS "minQty" FROM inventory ORDER BY id'
  );
  res.json(rows);
});

app.post('/inventory/arrival', async (req, res) => {
  const { id, qty } = req.body;
  const result = await pool.query(
    'UPDATE inventory SET qty = qty + $2 WHERE id = $1 RETURNING id, name, unit, qty::float AS qty, "minQty"::float AS "minQty"',
    [id, qty]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({ error: 'Item not found' });
  }
  await pool.query(
    'INSERT INTO inventory_log(item_id, change, reason) VALUES ($1, $2, $3)',
    [id, qty, 'arrival']
  );
  res.json(result.rows[0]);
});

app.post('/inventory/consume', async (req, res) => {
  const { id, qty } = req.body;
  const result = await pool.query(
    'UPDATE inventory SET qty = qty - $2 WHERE id = $1 RETURNING id, name, unit, qty::float AS qty, "minQty"::float AS "minQty"',
    [id, qty]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({ error: 'Item not found' });
  }
  await pool.query(
    'INSERT INTO inventory_log(item_id, change, reason) VALUES ($1, -$2, $3)',
    [id, qty, 'consume']
  );
  res.json(result.rows[0]);
});

app.get('/inventory/log', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT l.id, i.name, l.change::float AS change, l.reason, l.created_at
     FROM inventory_log l
     JOIN inventory i ON i.id = l.item_id
     ORDER BY l.id DESC
     LIMIT 100`
  );
  res.json(rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
