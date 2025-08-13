import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Stack,
} from '@mui/material';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('admin');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(username, role);
    onLogin(data);
    navigate(data.role === 'admin' ? '/admin' : '/barista');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="barista">Barista</MenuItem>
        </Select>
        <Button type="submit" variant="contained">
          Sign in
        </Button>
      </Stack>
    </Container>
  );
}
