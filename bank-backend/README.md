# Bank Backend

Production-ready Node.js + Express backend for the banking simulation app.

## Database SSL Configuration

The app supports three SSL modes controlled by environment variables:

| `DB_SSL` | `NODE_ENV`   | Behaviour                                        |
|----------|--------------|--------------------------------------------------|
| `false`  | any          | No SSL — for local development                   |
| `true`   | `production` | SSL with CA cert loaded from `config/ca.pem`     |
| `true`   | anything else| SSL enabled, `rejectUnauthorized: false` (staging)|

### Local Development
Set in your `.env`:
```
DB_SSL=false
NODE_ENV=development
```

### Production (Aiven MySQL on Render)
1. Download the **CA Certificate** from your Aiven project → Service → Overview → CA Certificate.
2. Save it as `config/ca.pem` in the project root.
3. Set in Render environment variables:
```
DB_SSL=true
NODE_ENV=production
```
4. The `config/ca.pem` file must be committed to your repo (it is public CA data, not a secret).

## Stack
- Node.js + Express
- mysql2/promise (Aiven MySQL with SSL)
- bcryptjs (10 rounds)
- jsonwebtoken (1h expiry)
- Hosted on Render

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.example` to `.env` and fill in all values:

| Variable        | Description                        |
|-----------------|------------------------------------|
| `DB_HOST`       | Aiven MySQL host                   |
| `DB_USER`       | Aiven MySQL user                   |
| `DB_PASSWORD`   | Aiven MySQL password               |
| `DB_NAME`       | Database name                      |
| `DB_PORT`       | Aiven MySQL port (usually 3306)    |
| `JWT_SECRET`    | Strong random secret (min 32 chars)|
| `PORT`          | Server port (default 5000)         |
| `CLIENT_ORIGIN` | Netlify frontend URL for CORS      |

### 3. Run locally
```bash
npm run dev
```

## API Endpoints

| Method | Endpoint              | Auth     | Description         |
|--------|-----------------------|----------|---------------------|
| POST   | `/api/auth/register`  | None     | Register user       |
| POST   | `/api/auth/login`     | None     | Login, returns JWT  |
| GET    | `/api/bank/me`        | Bearer   | Get profile         |
| GET    | `/health`             | None     | Health check        |

## Deploy to Render

1. Push code to GitHub.
2. Create a new **Web Service** on Render.
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server.js`
5. Add all environment variables from `.env.example` in Render dashboard.
