import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="barista">Barista</option>
      </select>
      <button type="submit">Sign in</button>
    </form>
  );
}
