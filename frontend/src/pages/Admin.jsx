import { useEffect, useState } from 'react';
import { getInventory, arrival, consume } from '../api';

export default function Admin() {
  const [items, setItems] = useState([]);

  const refresh = async () => {
    setItems(await getInventory());
  };

  useEffect(() => {
    refresh();
  }, []);

  const inc = async (id) => {
    await arrival(id, 1);
    refresh();
  };

  const dec = async (id) => {
    await consume(id, 1);
    refresh();
  };

  return (
    <div>
      <h2>Inventory (Admin)</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.name}: {i.qty} {i.unit}
            <button onClick={() => inc(i.id)}>+1</button>
            <button onClick={() => dec(i.id)}>-1</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
