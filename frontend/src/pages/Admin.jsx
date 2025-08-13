import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInventory, arrival, consume } from '../api';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';

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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inventory (Admin)
      </Typography>
      <Button component={Link} to="/admin/log" variant="outlined" sx={{ mb: 2 }}>
        View Log
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((i) => (
            <TableRow
              key={i.id}
              sx={{ bgcolor: i.qty < 0 ? '#ffcdd2' : i.qty < i.minQty ? '#ffebee' : undefined }}
            >
              <TableCell>{i.name}</TableCell>
              <TableCell>
                {i.qty} {i.unit}
              </TableCell>
              <TableCell>
                <Button variant="contained" size="small" onClick={() => inc(i.id)}>
                  +1
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ ml: 1 }}
                  onClick={() => dec(i.id)}
                >
                  -1
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
