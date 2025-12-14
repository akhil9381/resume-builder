import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Startup banner to verify deployed version in logs
console.log('FRONTEND_SERVER_START: Using regex catch-all route /.*/ - 2025-12-15');

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// SPA routing - all routes go to index.html
// Use '/*' to be compatible with path-to-regexp used by Express v5
// Use a regex route to match all paths and avoid path-to-regexp parameter parsing
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend server running on port ${PORT}`);
});
