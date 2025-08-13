# Kava Inventory Demo

This project contains a simple inventory management backend (Express + PostgreSQL) and a React frontend using MUI.

## Features

- View inventory for admin and barista roles
- Record arrivals and consumption of stock
- Highlight low and negative stock levels
- Keep an audit log of all inventory changes

## Running locally

### Backend
1. `cd backend`
2. `npm install`
3. Ensure PostgreSQL is available at `postgres://postgres:postgres@localhost:5432/kava`
4. `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Building frontend
`npm run build`

## Tests
Backend contains a placeholder test command:
```
cd backend && npm test
```

