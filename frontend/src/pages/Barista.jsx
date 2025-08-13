import { useEffect, useState } from 'react';
import { getInventory, consume } from '../api';

export default function Barista() {
  const [items, setItems] = useState([]);

  const refresh = async () => {
    setItems(await getInventory());
  };

  useEffect(() => {
    refresh();
  }, []);

  const dec = async (id) => {
    await consume(id, 1);
    refresh();
  };

  return (
    <div>
      <h2>Inventory (Barista)</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.name}: {i.qty} {i.unit}
            <button onClick={() => dec(i.id)}>-1</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
