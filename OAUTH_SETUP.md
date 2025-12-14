## Google OAuth Setup Checklist

### Current Configuration
- Backend: https://resume-builder-oopi.onrender.com
- Frontend: https://resume-builder-1-u4k3.onrender.com
- Google Client ID: 238423122156-6kdr0uea268ulhmmcobkngv6dtm0cqdt.apps.googleusercontent.com

### ✅ Required Google Cloud Console Settings

Go to: https://console.cloud.google.com/apis/credentials

1. **Find your OAuth 2.0 Client ID** - Click on the ID above
2. **Authorized redirect URIs** - MUST include EXACTLY:
   - `https://resume-builder-oopi.onrender.com/api/auth/google/callback`
   
3. **Authorized JavaScript origins** - MUST include:
   - `https://resume-builder-oopi.onrender.com`
   - `https://resume-builder-1-u4k3.onrender.com`
   - `http://localhost:5173` (for local testing)

### Test These URLs
1. Backend health: https://resume-builder-oopi.onrender.com/api/health
   - Should return JSON with status: "ok"

2. Google endpoint: https://resume-builder-oopi.onrender.com/api/auth/google
   - Should redirect to Google login (or show error if CLIENT_ID invalid)

3. Frontend: https://resume-builder-1-u4k3.onrender.com
   - Click Google login button
   - Check browser DevTools Console for errors

### Common Issues
- ❌ "not found" = Wrong callback URL in Google Console
- ❌ "Invalid client" = Wrong CLIENT_ID or CLIENT_SECRET
- ❌ Localhost works but deployed doesn't = Missing domain in Google Console authorized origins
