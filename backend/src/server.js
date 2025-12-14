import "./config/env.js";   // ✅ FIRST
import "./config/db.js";    // ✅ SECOND
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
