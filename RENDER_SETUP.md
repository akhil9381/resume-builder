# Render Deployment Guide

## Frontend Service Setup (resume-builder-1-u4k3.onrender.com)

### In Render Dashboard:
1. Go to your frontend service
2. **Settings** → **Build & Deploy**

#### Build Command:
```
cd FrontEnd && npm install && npm run build
```

#### Start Command:
```
cd FrontEnd && npm start
```

#### Environment Variables:
```
VITE_BACKEND_URL=https://resume-builder-oopi.onrender.com
```

#### Root Directory (if asked):
```
FrontEnd
```

---

## Backend Service Setup (resume-builder-oopi.onrender.com)

### In Render Dashboard:
1. Go to your backend service
2. **Settings** → **Build & Deploy**

#### Build Command:
```
cd backend && npm install
```

#### Start Command:
```
cd backend && npm start
```

#### Environment Variables:
```
PORT=5000
NODE_ENV=production
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
GOOGLE_CLIENT_ID=<your_client_id>
GOOGLE_CLIENT_SECRET=<your_client_secret>
CLIENT_URL=https://resume-builder-1-u4k3.onrender.com
SERVER_URL=https://resume-builder-oopi.onrender.com
CORS_ORIGIN=https://resume-builder-1-u4k3.onrender.com,http://localhost:5173
```

---

## After Updating:
1. Click **Manual Deploy** on both services
2. Wait for deployment to complete (~5 minutes)
3. Test: https://resume-builder-1-u4k3.onrender.com/oauth-success?token=test
4. Should see "Signing you in..." page

If still "not found", check:
- Render logs for any build/start errors
- Browser DevTools Console for JavaScript errors
- Service URLs are correct
