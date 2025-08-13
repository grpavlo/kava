const API_URL = 'http://localhost:3000';

export async function login(username, role) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, role })
  });
  return res.json();
}

export async function getInventory() {
  const res = await fetch(`${API_URL}/inventory`);
  return res.json();
}

export async function arrival(id, qty) {
  await fetch(`${API_URL}/inventory/arrival`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, qty })
  });
}

export async function consume(id, qty) {
  await fetch(`${API_URL}/inventory/consume`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, qty })
  });
}
