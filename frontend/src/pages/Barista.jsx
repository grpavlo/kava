import { useEffect, useState } from 'react';
import { getInventory, consume } from '../api';
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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inventory (Barista)
      </Typography>
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
            <TableRow key={i.id} sx={{ bgcolor: i.qty < i.minQty ? '#ffebee' : undefined }}>
              <TableCell>{i.name}</TableCell>
              <TableCell>
                {i.qty} {i.unit}
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
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
