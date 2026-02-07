// // // // // // // // // // // // // // import express from "express";
// // // // // // // // // // // // // // import dotenv from "dotenv";
// // // // // // // // // // // // // // import cors from "cors";
// // // // // // // // // // // // // // import authRoutes from "./routes/auth.routes.js";

// // // // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // // app.use("/auth", authRoutes);

// // // // // // // // // // // // // // app.listen(process.env.PORT, () => {
// // // // // // // // // // // // // //   console.log("Server running on port", process.env.PORT);
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // import express from "express";
// // // // // // // // // // // // // import dotenv from "dotenv";
// // // // // // // // // // // // // import cors from "cors";
// // // // // // // // // // // // // import authRoutes from "./routes/auth.routes.js";
// // // // // // // // // // // // // import driveRoutes from "./routes/drive.routes.js";


// // // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // // console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
// // // // // // // // // // // // // console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
// // // // // // // // // // // // // console.log("GOOGLE_REDIRECT_URI:", process.env.GOOGLE_REDIRECT_URI);

// // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // app.use(cors());
// // // // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // // app.use("/auth", authRoutes);
// // // // // // // // // // // // // app.use("/drive", driveRoutes);

// // // // // // // // // // // // // app.listen(process.env.PORT, () => {
// // // // // // // // // // // // //   console.log("Server running on port", process.env.PORT);
// // // // // // // // // // // // // });

// // // // // // // // // // // // import express from "express";
// // // // // // // // // // // // import dotenv from "dotenv";
// // // // // // // // // // // // import driveRoutes from "./routes/drive.routes.js";

// // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // const app = express();
// // // // // // // // // // // // const PORT = process.env.PORT || 4000;

// // // // // // // // // // // // app.use("/api/drive", driveRoutes);

// // // // // // // // // // // // app.listen(PORT, () => {
// // // // // // // // // // // //   console.log(`Server running on port ${PORT}`);
// // // // // // // // // // // // });

// // // // // // // // // // // import express from "express";
// // // // // // // // // // // import dotenv from "dotenv";
// // // // // // // // // // // import driveRouter from "./routes/drive.routes.js"; // שים לב לנתיב נכון
// // // // // // // // // // // import authRouter from "./routes/auth.routes.js";


// // // // // // // // // // // dotenv.config();

// // // // // // // // // // // const app = express();
// // // // // // // // // // // const PORT = 4000;

// // // // // // // // // // // app.use(express.json());
// // // // // // // // // // // app.use("/drive", driveRouter);
// // // // // // // // // // // app.use("/auth", authRouter);

// // // // // // // // // // // // חיבור ה־router
// // // // // // // // // // // app.use("/drive", driveRouter);

// // // // // // // // // // // app.listen(PORT, () => {
// // // // // // // // // // //   console.log(`Server running on port ${PORT}`);
// // // // // // // // // // // });
// // // // // // // // // // // app.use((req, res, next) => {
// // // // // // // // // // //   console.log("Incoming request:", req.url);
// // // // // // // // // // //   next();
// // // // // // // // // // // });


// // // // // // // // // // import express from "express";
// // // // // // // // // // import dotenv from "dotenv";
// // // // // // // // // // import driveRouter from "./routes/drive.routes.js";
// // // // // // // // // // import authRouter from "./routes/auth.routes.js";
// // // // // // // // // // import searchRouter from "./routes/search.routes.js";
// // // // // // // // // // import { initCLIP, searchImagesByText, computeImageEmbedding } from "./clipService.js";
// // // // // // // // // // // import { loadImages } from "./services/syncImages.js";
// // // // // // // // // // import { loadImages, searchImagesByText, computeImageEmbedding }  from "./services/syncImages.js";
// // // // // // // // // // dotenv.config();

// // // // // // // // // // const app = express();
// // // // // // // // // // const PORT = 4000;

// // // // // // // // // // app.use(express.json());

// // // // // // // // // // // חיבור routers
// // // // // // // // // // app.use("/auth", authRouter); // now handles /auth/google & /auth/google/callback
// // // // // // // // // // app.use("/drive", driveRouter);
// // // // // // // // // // app.use("/search", searchRouter);

// // // // // // // // // // // Debugging: רישום כל בקשה
// // // // // // // // // // app.use((req, res, next) => {
// // // // // // // // // //   console.log("Incoming request:", req.url);
// // // // // // // // // //   next();
// // // // // // // // // // });
// // // // // // // // // // await initCLIP();

// // // // // // // // // // app.get("/search", async (req, res) => {
// // // // // // // // // //   const query = req.query.q;
// // // // // // // // // //   const images = loadImages(); // טען את רשימת התמונות + embeddings
// // // // // // // // // //   const results = await searchImagesByText(query, images);
// // // // // // // // // //   res.json(results);
// // // // // // // // // // });

// // // // // // // // // // let images = loadImages();

// // // // // // // // // // app.get("/search", async (req, res) => {
// // // // // // // // // //   const query = req.query.q;
// // // // // // // // // //   const results = await searchImagesByText(query, images, clipPipeline);
// // // // // // // // // //   res.json(results);
// // // // // // // // // // });


// // // // // // // // // // app.listen(PORT, () => {
// // // // // // // // // //   console.log(`Server running on port ${PORT}`);
// // // // // // // // // // });



// // // // // // // // // import express from "express";
// // // // // // // // // import dotenv from "dotenv";

// // // // // // // // // import authRouter from "./routes/auth.routes.js";
// // // // // // // // // import driveRouter from "./routes/drive.routes.js";
// // // // // // // // // import searchRouter from "./routes/search.routes.js";

// // // // // // // // // dotenv.config();

// // // // // // // // // const app = express();
// // // // // // // // // const PORT = 4000;

// // // // // // // // // app.use(express.json());

// // // // // // // // // // Routes
// // // // // // // // // app.use("/auth", authRouter);
// // // // // // // // // app.use("/drive", driveRouter);
// // // // // // // // // app.use("/search", searchRouter);

// // // // // // // // // // בדיקת חיים
// // // // // // // // // app.get("/", (req, res) => {
// // // // // // // // //   res.send("Server is running ✅");
// // // // // // // // // });

// // // // // // // // // app.listen(PORT, () => {
// // // // // // // // //   console.log(`Server running on http://localhost:${PORT}`);
// // // // // // // // // });

// // // // // // // // import express from "express";
// // // // // // // // import dotenv from "dotenv";
// // // // // // // // import cors from "cors";

// // // // // // // // import authRouter from "./routes/auth.routes.js";
// // // // // // // // import driveRouter from "./routes/drive.routes.js";
// // // // // // // // import searchRouter from "./routes/search.routes.js";

// // // // // // // // dotenv.config();

// // // // // // // // const app = express();
// // // // // // // // const PORT = 4000;

// // // // // // // // app.use(cors());
// // // // // // // // app.use(express.json());

// // // // // // // // app.use("/auth", authRouter);
// // // // // // // // app.use("/drive", driveRouter);
// // // // // // // // app.use("/search", searchRouter);

// // // // // // // // app.get("/", (req, res) => res.send("Smart Drive Server is Running 🚀"));

// // // // // // // // app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
// // // // // // // import express from "express";
// // // // // // // import cors from "cors";
// // // // // // // import dotenv from "dotenv";
// // // // // // // import searchRouter from "./routes/search.routes.js";
// // // // // // // import driveRouter from "./routes/drive.routes.js";
// // // // // // // import authRouter from "./routes/auth.routes.js";

// // // // // // // dotenv.config();
// // // // // // // const app = express();

// // // // // // // app.use(cors()); // מאפשר ל-React לדבר עם השרת
// // // // // // // app.use(express.json());

// // // // // // // // חשוב: הנתיב הזה חייב להתאים למה שה-React מבקש
// // // // // // // app.use("/api/search", searchRouter); 
// // // // // // // app.use("/drive", driveRouter);
// // // // // // // app.use("/auth", authRouter);

// // // // // // // const PORT = 5000; 
// // // // // // // app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
// // // // // // import express from "express";
// // // // // // import cors from "cors";
// // // // // // import dotenv from "dotenv";
// // // // // // import searchRouter from "./routes/search.routes.js";
// // // // // // import driveRouter from "./routes/drive.routes.js";
// // // // // // import authRouter from "./routes/auth.routes.js";

// // // // // // dotenv.config();
// // // // // // const app = express();

// // // // // // // מאפשר גם ל-React וגם לתוסף הכרום לדבר עם השרת
// // // // // // app.use(cors({ origin: '*' })); 
// // // // // // app.use(express.json());

// // // // // // // כאן אנחנו מחברים את כל "השלוחות"
// // // // // // app.use("/api/search", searchRouter); 
// // // // // // app.use("/api/drive", driveRouter); // שימי לב ל-api/
// // // // // // app.use("/api/auth", authRouter);

// // // // // // const PORT = process.env.PORT || 5000; 
// // // // // // app.listen(PORT, () => {
// // // // // //     console.log(`🚀 Unified Server running on http://localhost:${PORT}`);
// // // // // // });
// // // // // import express from "express";
// // // // // import cors from "cors";
// // // // // import dotenv from "dotenv";
// // // // // import searchRouter from "./routes/search.routes.js";
// // // // // import driveRouter from "./routes/drive.routes.js";
// // // // // import authRouter from "./routes/auth.routes.js";

// // // // // dotenv.config();
// // // // // const app = express();

// // // // // // הגדרת CORS שמאפשרת לתוסף ול-React לעבוד מול השרת
// // // // // app.use(cors({ origin: '*' })); 
// // // // // app.use(express.json());

// // // // // // ריכוז הנתיבים - שימי לב לשמות
// // // // // app.use("/api/search", searchRouter); 
// // // // // app.use("/drive", driveRouter); // כאן נמצא ה-view וה-sync
// // // // // app.use("/auth", authRouter);

// // // // // const PORT = 5000; 
// // // // // app.listen(PORT, () => {
// // // // //     console.log(`🚀 Unified Backend running on http://localhost:${PORT}`);
// // // // // });
// // // // // ייבוא פונקציית הסנכרון מהראוטר (נצטרך לייצא אותה בנפרד או לקרוא לוגיקה משותפת)
// // // // import { syncDriveLogic } from "./routes/drive.routes.js"; 

// // // // const FIVE_MINUTES = 5 * 60 * 1000;

// // // // // פונקציה שרצה ברקע
// // // // const startAutoSync = () => {
// // // //     console.log("🤖 Auto-Sync Worker started...");
// // // //     setInterval(async () => {
// // // //         try {
// // // //             console.log("⏰ Scheduled sync starting...");
// // // //             await syncDriveLogic(); // נעדכן את drive.routes שייצא את הלוגיקה
// // // //             console.log("✅ Scheduled sync finished.");
// // // //         } catch (err) {
// // // //             console.error("❌ Scheduled sync failed:", err.message);
// // // //         }
// // // //     }, FIVE_MINUTES);
// // // // };

// // // // // הפעלת הסנכרון האוטומטי אחרי שהשרת עולה
// // // // app.listen(PORT, () => {
// // // //     console.log(`🚀 Unified Backend running on http://localhost:${PORT}`);
// // // //     startAutoSync(); 
// // // // });

// // // import express from "express";
// // // import cors from "cors";
// // // import dotenv from "dotenv";
// // // import searchRouter from "./routes/search.routes.js";
// // // import driveRouter, { syncDriveLogic } from "./routes/drive.routes.js";
// // // import authRouter from "./routes/auth.routes.js";

// // // // 1. טעינת הגדרות
// // // dotenv.config();
// // // const app = express(); // כאן מוגדר ה-app!
// // // const PORT = 5000;

// // // // 2. Middlewares
// // // app.use(cors({ origin: '*' })); 
// // // app.use(express.json());

// // // // 3. הגדרת הנתיבים (Routes)
// // // app.use("/api/search", searchRouter); 
// // // app.use("/drive", driveRouter); 
// // // app.use("/auth", authRouter);
// // // app.use(cors({ origin: '*' })); // זה מאפשר לתוסף לגשת לשרת מכל מקום
// // // // 4. פונקציית סנכרון אוטומטי (כל 5 דקות)
// // // const startAutoSync = () => {
// // //     console.log("🤖 Auto-Sync Worker initialized...");
    
// // //     // הפעלה ראשונה מיד עם עליית השרת
// // // syncDriveLogic().catch(err => {
// // //     console.error("❌ Initial sync failed!");
// // //     console.error("Error Message:", err.message);
// // //     console.error("Full Error Stack:", err); // זה יגלה לנו אם זו סיסמה או כתובת לא נכונה
// // // });
// // //     // הגדרת מחזוריות
// // //     setInterval(async () => {
// // //         try {
// // //             console.log("⏰ Scheduled sync running...");
// // //             const total = await syncDriveLogic();
// // //             console.log(`✅ Sync finished. Total images in DB: ${total}`);
// // //         } catch (err) {
// // //             console.error("❌ Scheduled sync failed:", err.message);
// // //         }
// // //     }, 5 * 60 * 1000); // 5 דקות במילישניות
// // // };

// // // // 5. הפעלת השרת
// // // app.listen(PORT, () => {
// // //     console.log(`🚀 Unified Backend running on http://localhost:${PORT}`);
// // //     console.log(`📡 Google Client ID: ${process.env.GOOGLE_CLIENT_ID}`);
// // //     startAutoSync(); // קריאה לפונקציית האוטומציה
// // // });
// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import searchRouter from "./routes/search.routes.js";
// // import driveRouter, { syncAllUsersDrive } from "./routes/drive.routes.js";
// // import authRouter from "./routes/auth.routes.js";

// // // 1. טעינת הגדרות
// // dotenv.config();
// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // 2. Middlewares
// // app.use(cors({ origin: '*' })); 
// // app.use(express.json());

// // // 3. הגדרת הנתיבים (Routes)
// // app.use("/api/search", searchRouter);
// // app.use("/drive", driveRouter);
// // app.use("/auth", authRouter);

// // // 4. פונקציית סנכרון אוטומטי (עוברת על כל המשתמשים ב-DB)
// // const startAutoSync = () => {
// //     console.log("🤖 Global Auto-Sync Worker initialized...");
    
// //     // הפעלה ראשונה מיד עם עליית השרת
// //     syncAllUsersDrive().catch(err => console.error("Initial global sync failed:", err.message));

// //     // הגדרת מחזוריות של פעם ב-10 דקות
// //     setInterval(async () => {
// //         try {
// //             console.log("⏰ Scheduled Global Sync running...");
// //             await syncAllUsersDrive();
// //             console.log("✅ Global Sync finished successfully.");
// //         } catch (err) {
// //             console.error("❌ Scheduled Global Sync failed:", err.message);
// //         }
// //     }, 10 * 60 * 1000); 
// // };

// // // 5. הפעלת השרת
// // app.listen(PORT, () => {
// //     console.log(`🚀 Unified Backend running on http://localhost:${PORT}`);
// //     console.log(`📡 Google Client ID: ${process.env.GOOGLE_CLIENT_ID}`);
    
// //     // הפעלת המנוע האוטומטי
// //     startAutoSync(); 
// // });
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import searchRouter from "./routes/search.routes.js";
// import driveRouter, { syncAllUsersDrive } from "./routes/drive.routes.js";
// import authRouter from "./routes/auth.routes.js";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/search", searchRouter);
// app.use("/drive", driveRouter);
// app.use("/auth", authRouter);

// // וורקר שרץ כל 10 דקות וסורק את כל המשתמשים
// setInterval(async () => {
//     await syncAllUsersDrive();
// }, 10 * 60 * 1000);

// app.listen(5000, () => {
//     console.log("🚀 Server running on http://localhost:5000");
//     // הפעלה ראשונית של הסנכרון
//     syncAllUsersDrive();
// });
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
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    
    // הפעלה ראשונית של הסנכרון (באיחור קטן כדי לוודא שהשרת יציב)
    setTimeout(() => {
        syncAllUsersDrive().catch(err => console.error("Initial sync error:", err.message));
    }, 5000);
});