# Bank Frontend

Production-ready React + Vite frontend for the SecureBank banking simulation app.

## Stack
- React 18 + Vite
- React Router v6
- Axios (with JWT interceptor)
- CSS custom properties (dark theme)
- Hosted on Netlify

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.example` to `.env` and fill in:

| Variable        | Description                          |
|-----------------|--------------------------------------|
| `VITE_API_URL`  | Your Render backend URL (no trailing slash) |

Example:
```
VITE_API_URL=https://bank-backend.onrender.com
```

### 3. Run locally
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## Pages

| Route         | Component    | Protected |
|---------------|--------------|-----------|
| `/`           | → `/login`   | No        |
| `/register`   | Register     | No        |
| `/login`      | Login        | No        |
| `/dashboard`  | Dashboard    | ✅ Yes     |

## Deploy to Netlify

1. Push code to GitHub.
2. Create a new site on Netlify, point to `bank-frontend` directory.
3. Set **Build Command**: `npm run build`
4. Set **Publish Directory**: `dist`
5. Add `VITE_API_URL` environment variable in Netlify dashboard.
6. Add a `_redirects` file inside the `public/` folder:
   ```
   /*    /index.html   200
   ```
   This ensures React Router works correctly on page refresh.
