
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import searchRouter from "./routes/search.routes.js";
import driveRouter, { syncAllUsersDrive } from "./routes/drive.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/search", searchRouter);
app.use("/drive", driveRouter);
app.use("/auth", authRouter);

// Health Check
app.get("/", (req, res) => res.send("🚀 Smart Search Server is Alive!"));

// וורקר סנכרון אוטומטי
setInterval(async () => {
    try {
        console.log("⏰ Starting scheduled background sync...");
        await syncAllUsersDrive();
    } catch (err) {
        console.error("❌ Scheduled sync failed:", err.message);
    }
}, 30 * 60 * 1000); // שיניתי ל-30 דקות כדי לא להעמיס על Hugging Face

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);   
    // הפעלה ראשונית של הסנכרון (באיחור קטן כדי לוודא שהשרת יציב)
    setTimeout(() => {
        syncAllUsersDrive().catch(err => console.error("Initial sync error:", err.message));
    }, 5000);
});