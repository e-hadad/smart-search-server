// // // // // // // // import express from "express";
// // // // // // // // import fs from "fs";
// // // // // // // // import path from "path";

// // // // // // // // const router = express.Router();
// // // // // // // // const DB_PATH = path.join("db/imagesDB.json");

// // // // // // // // router.get("/", (req, res) => {
// // // // // // // //   const { query } = req.query;
// // // // // // // //   if (!query) return res.json([]);

// // // // // // // //   const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

// // // // // // // //   // דוגמה לחיפוש פשוט לפי שם
// // // // // // // //   const results = db.filter(img => img.name.toLowerCase().includes(query.toLowerCase()));

// // // // // // // //   res.json(results);
// // // // // // // // });

// // // // // // // // export default router;

// // // // // // // import express from "express";
// // // // // // // import fs from "fs";
// // // // // // // import path from "path";
// // // // // // // import { generateTextEmbedding, cosineSimilarity } from "../services/embeddingService.js";

// // // // // // // const router = express.Router();
// // // // // // // const DB_PATH = path.resolve("db.json");

// // // // // // // router.get("/", async (req, res) => {
// // // // // // //     const { query } = req.query;
// // // // // // //     if (!query) return res.json([]);

// // // // // // //     try {
// // // // // // //         if (!fs.existsSync(DB_PATH)) return res.status(404).send("DB not found");
// // // // // // //         const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

// // // // // // //         // 1. הפיכת טקסט החיפוש לוקטור
// // // // // // //         console.log(`🔍 Searching for: ${query}`);
// // // // // // //         const queryEmbedding = await generateTextEmbedding(query);

// // // // // // //         // 2. השוואה לכל התמונות ב-DB שקיימות בהן embeddings
// // // // // // //         const results = db
// // // // // // //             .filter(img => img.embedding && img.embedding.length > 0)
// // // // // // //             .map(img => ({
// // // // // // //                 id: img.id,
// // // // // // //                 name: img.name,
// // // // // // //                 similarity: cosineSimilarity(queryEmbedding, img.embedding)
// // // // // // //             }))
// // // // // // //             .sort((a, b) => b.similarity - a.similarity) // מהכי דומה להכי פחות
// // // // // // //             .slice(0, 10); // 10 התוצאות הכי טובות

// // // // // // //         res.json(results);
// // // // // // //     } catch (err) {
// // // // // // //         console.error("Search error:", err);
// // // // // // //         res.status(500).send("Error performing search");
// // // // // // //     }
// // // // // // // });

// // // // // // // export default router;
// // // // // // import express from "express";
// // // // // // import fs from "fs";
// // // // // // import path from "path";
// // // // // // import { generateTextEmbedding, cosineSimilarity } from "../services/embeddingService.js";

// // // // // // const router = express.Router();
// // // // // // const DB_PATH = path.resolve("db.json");

// // // // // // router.get("/", async (req, res) => {
// // // // // //     // 1. קבלת השאילתה - תומך גם ב-query וגם ב-q כדי למנוע טעויות
// // // // // //     const queryText = req.query.query || req.query.q; 
    
// // // // // //     if (!queryText) return res.json([]);

// // // // // //     try {
// // // // // //         if (!fs.existsSync(DB_PATH)) return res.status(404).send("DB not found");
// // // // // //         const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

// // // // // //         // 2. הפיכת טקסט החיפוש לוקטור
// // // // // //         console.log(`🔍 Searching for: ${queryText}`);
// // // // // //         const queryEmbedding = await generateTextEmbedding(queryText);

// // // // // //         // 3. השוואה לכל התמונות ב-DB
// // // // // //         const results = db
// // // // // //             .filter(img => img.embedding && img.embedding.length > 0)
// // // // // //             .map(img => ({
// // // // // //                 id: img.id,
// // // // // //                 name: img.name,
// // // // // //                 // הוספת ה-URL שפונה לנתיב ה-View שיצרנו ב-drive.routes
// // // // // //                 url: `http://localhost:5000/drive/view/${img.id}`, 
// // // // // //                 // שינוי השם ל-score כדי להתאים למה שה-React מחפש
// // // // // //                 score: cosineSimilarity(queryEmbedding, img.embedding)
// // // // // //             }))
// // // // // //             .sort((a, b) => b.score - a.score) 
// // // // // //             .slice(0, 12); // החזרנו 12 תוצאות (מתחלק יפה בשורות של 3 או 4)

// // // // // //         res.json(results);
// // // // // //     } catch (err) {
// // // // // //         console.error("Search error:", err);
// // // // // //         res.status(500).send("Error performing search");
// // // // // //     }
// // // // // // });
// // // // // // // נתיב לחיפוש תמונות דומות לפי ID
// // // // // // router.get("/similar/:id", async (req, res) => {
// // // // // //     try {
// // // // // //         const { id } = req.params;
// // // // // //         const dbData = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
        
// // // // // //         // 1. מציאת תמונת המקור
// // // // // //         const targetImage = dbData.find(img => img.id === id);
// // // // // //         if (!targetImage) return res.status(404).json({ error: "Image not found" });

// // // // // //         // 2. חישוב מרחק לכל שאר התמונות
// // // // // //         const results = dbData
// // // // // //             .filter(img => img.id !== id) // לא להחזיר את אותה תמונה
// // // // // //             .map(img => ({
// // // // // //                 id: img.id,
// // // // // //                 name: img.name,
// // // // // //                 score: cosineSimilarity(targetImage.embedding, img.embedding)
// // // // // //             }))
// // // // // //             .sort((a, b) => b.score - a.score)
// // // // // //             .slice(0, 10); // 10 התוצאות הכי קרובות

// // // // // //         res.json(results);
// // // // // //     } catch (err) {
// // // // // //         res.status(500).json({ error: err.message });
// // // // // //     }
// // // // // // });

// // // // // // export default router;
// // // // // import express from "express";
// // // // // import fs from "fs";
// // // // // import path from "path";
// // // // // import { generateTextEmbedding, cosineSimilarity } from "../services/embeddingService.js";

// // // // // const router = express.Router();
// // // // // const DB_PATH = path.resolve("db.json");

// // // // // const getImagesFromDB = () => {
// // // // //     if (!fs.existsSync(DB_PATH)) return [];
// // // // //     try {
// // // // //         const data = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
// // // // //         // תמיכה בשני סוגי המבנים של ה-DB
// // // // //         return Array.isArray(data) ? data : (data.images || []);
// // // // //     } catch (e) {
// // // // //         return [];
// // // // //     }
// // // // // };

// // // // // // 1. חיפוש טקסטואלי
// // // // // router.get("/", async (req, res) => {
// // // // //     const queryText = req.query.query || req.query.q; 
// // // // //     if (!queryText) return res.json([]);

// // // // //     try {
// // // // //         const images = getImagesFromDB();
// // // // //         const queryEmbedding = await generateTextEmbedding(queryText);

// // // // //         const results = images
// // // // //             .filter(img => img.embedding)
// // // // //             .map(img => ({
// // // // //                 id: img.id,
// // // // //                 name: img.name,
// // // // //                 url: `http://localhost:5000/drive/view/${img.id}`,
// // // // //                 score: cosineSimilarity(queryEmbedding, img.embedding)
// // // // //             }))
// // // // //             .sort((a, b) => b.score - a.score) 
// // // // //             .slice(0, 12);

// // // // //         res.json(results);
// // // // //     } catch (err) {
// // // // //         res.status(500).send("Error performing search");
// // // // //     }
// // // // // });

// // // // // // 2. חיפוש תמונות דומות - ודאי שהנתיב הזה קיים!
// // // // // router.get("/similar/:id", async (req, res) => {
// // // // //     try {
// // // // //         const { id } = req.params;
// // // // //         console.log(`🔍 Looking for images similar to ID: ${id}`);
        
// // // // //         const images = getImagesFromDB();
// // // // //         const targetImage = images.find(img => img.id === id);

// // // // //         if (!targetImage || !targetImage.embedding) {
// // // // //             console.log("❌ Image not found in DB or has no embedding");
// // // // //             return res.status(404).json({ error: "Image not found in database" });
// // // // //         }

// // // // //         const results = images
// // // // //             .filter(img => img.id !== id && img.embedding)
// // // // //             .map(img => ({
// // // // //                 id: img.id,
// // // // //                 name: img.name,
// // // // //                 url: `http://localhost:5000/drive/view/${img.id}`,
// // // // //                 score: cosineSimilarity(targetImage.embedding, img.embedding)
// // // // //             }))
// // // // //             .sort((a, b) => b.score - a.score)
// // // // //             .slice(0, 10);

// // // // //         res.json(results);
// // // // //     } catch (err) {
// // // // //         console.error("Similar Search Error:", err);
// // // // //         res.status(500).json({ error: err.message });
// // // // //     }
// // // // // });

// // // // // export default router;
// // // // import express from "express";
// // // // import pool from "../config/db.js"; // ייבוא החיבור ל-DB
// // // // import { generateTextEmbedding, cosineSimilarity } from "../services/embeddingService.js";

// // // // const router = express.Router();

// // // // // 1. חיפוש טקסטואלי (Text-to-Image)
// // // // router.get("/", async (req, res) => {
// // // //     const queryText = req.query.query || req.query.q; 
// // // //     if (!queryText) return res.json([]);

// // // //     try {
// // // //         // שליפת כל התמונות מה-Database
// // // //         const dbRes = await pool.query('SELECT google_file_id as id, name, embedding FROM images');
// // // //         const images = dbRes.rows;

// // // //         const queryEmbedding = await generateTextEmbedding(queryText);

// // // //         const results = images
// // // //             .map(img => {
// // // //                 // המרת הוקטור מטקסט חזרה למערך מספרים
// // // //                 const imgEmbedding = typeof img.embedding === 'string' 
// // // //                     ? JSON.parse(img.embedding) 
// // // //                     : img.embedding;

// // // //                 return {
// // // //                     id: img.id,
// // // //                     name: img.name,
// // // //                     url: `http://localhost:5000/drive/view/${img.id}`,
// // // //                     score: imgEmbedding ? cosineSimilarity(queryEmbedding, imgEmbedding) : 0
// // // //                 };
// // // //             })
// // // //             .filter(img => img.score > 0)
// // // //             .sort((a, b) => b.score - a.score) 
// // // //             .slice(0, 12);

// // // //         res.json(results);
// // // //     } catch (err) {
// // // //         console.error("Search Error:", err);
// // // //         res.status(500).send("Error performing search");
// // // //     }
// // // // });

// // // // // 2. חיפוש תמונות דומות (Image-to-Image)
// // // // router.get("/similar/:id", async (req, res) => {
// // // //     try {
// // // //         const { id } = req.params;
        
// // // //         // שליפת כל התמונות
// // // //         const dbRes = await pool.query('SELECT google_file_id as id, name, embedding FROM images');
// // // //         const images = dbRes.rows;

// // // //         const targetImage = images.find(img => img.id === id);

// // // //         if (!targetImage || !targetImage.embedding) {
// // // //             return res.status(404).json({ error: "Image not found in database" });
// // // //         }

// // // //         const targetEmbedding = typeof targetImage.embedding === 'string' 
// // // //             ? JSON.parse(targetImage.embedding) 
// // // //             : targetImage.embedding;

// // // //         const results = images
// // // //             .filter(img => img.id !== id)
// // // //             .map(img => {
// // // //                 const imgEmbedding = typeof img.embedding === 'string' 
// // // //                     ? JSON.parse(img.embedding) 
// // // //                     : img.embedding;

// // // //                 return {
// // // //                     id: img.id,
// // // //                     name: img.name,
// // // //                     url: `http://localhost:5000/drive/view/${img.id}`,
// // // //                     score: imgEmbedding ? cosineSimilarity(targetEmbedding, imgEmbedding) : 0
// // // //                 };
// // // //             })
// // // //             .sort((a, b) => b.score - a.score)
// // // //             .slice(0, 10);

// // // //         res.json(results);
// // // //     } catch (err) {
// // // //         console.error("Similar Search Error:", err);
// // // //         res.status(500).json({ error: err.message });
// // // //     }
// // // // });

// // // // export default router;


// // // // שינויים ב 29/01
// // // import express from "express";
// // // import pool from "../config/db.js";
// // // import { generateTextEmbedding } from "../services/embeddingService.js";

// // // const router = express.Router();

// // // router.get("/", async (req, res) => {
// // //     const queryText = req.query.query || req.query.q;
// // //     if (!queryText) return res.json([]);

// // //     try {
// // //         console.log(`🔍 Searching for: "${queryText}"`);
        
// // //         // 1. הפיכת טקסט החיפוש לוקטור
// // //         const queryEmbedding = await generateTextEmbedding(queryText);
// // //         const vectorString = `[${queryEmbedding.join(',')}]`;

// // //         // 2. חיפוש וקטורי ב-Supabase (חישוב מרחק קוסינוס)
// // //         // שימי לב: השאילתה משתמשת באופרטור <=> של pgvector
// // //         const query = `
// // //             SELECT google_file_id, name, 
// // //             (1 - (embedding <=> $1)) as similarity
// // //             FROM images
// // //             WHERE embedding IS NOT NULL
// // //             ORDER BY similarity DESC
// // //             LIMIT 12;
// // //         `;

// // //         const result = await pool.query(query, [vectorString]);

// // //         // 3. החזרת התוצאות
// // //         const formattedResults = result.rows.map(img => ({
// // //             id: img.google_file_id,
// // //             name: img.name,
// // //             url: `http://localhost:5000/drive/view/${img.google_file_id}`,
// // //             score: img.similarity
// // //         }));

// // //         res.json(formattedResults);
// // //     } catch (err) {
// // //         console.error("Search Error:", err);
// // //         res.status(500).json({ error: "Internal server error" });
// // //     }
// // // });

// // // export default router;
// // import express from "express";
// // import pool from "../config/db.js";
// // import { generateTextEmbedding } from "../services/embeddingService.js";

// // const router = express.Router();

// // router.get("/", async (req, res) => {
// //     const queryText = req.query.query || req.query.q;
// //     if (!queryText) return res.json([]);

// //     // המייל שלך - ככה הוא יחפש רק בתמונות שסנכרנת מהדרייב שלך
// //     const userEmail = "efrat05022005@gmail.com"; 

// //     try {
// //         console.log(`🔍 Searching for: "${queryText}" for user: ${userEmail}`);
        
// //         // 1. הפיכת טקסט החיפוש לוקטור (CLIP)
// //         const queryEmbedding = await generateTextEmbedding(queryText);

// //         // // 2. קריאה לפונקציית match_images שבנינו ב-Supabase
// //         // // הפונקציה כבר מחשבת דמיון, מסננת לפי משתמש וממיינת
// //         // const result = await pool.query(
// //         //     "SELECT * FROM match_images($1, $2, $3, $4)",
// //         //     [queryEmbedding, 0.1, 12, userEmail]
// //         // );
// //         // בתוך router.get("/", ...), שורה של השאילתה:
// // const result = await pool.query(
// //     "SELECT * FROM match_images($1, $2, $3, $4)",
// //     [JSON.stringify(queryEmbedding), 0.1, 12, userEmail] 
// // );

// //         // 3. החזרת התוצאות בפורמט שה-Frontend מצפה לו
// //         const formattedResults = result.rows.map(img => ({
// //             id: img.google_file_id, // משתמשים ב-ID של גוגל לצורך הצגת התמונה
// //             name: img.name,
// //             score: img.similarity
// //         }));

// //         res.json(formattedResults);
// //     } catch (err) {
// //         console.error("Search Error:", err);
// //         res.status(500).json({ error: "Internal server error" });
// //     }
// // });

// // export default router;
// import express from "express";
// import { supabase } from "../config/supabase.js";
// import { generateTextEmbedding } from "../services/embeddingService.js";

// const router = express.Router();

// // router.get("/", async (req, res) => {
// //     const { q, email } = req.query;
// //     if (!q || !email) return res.json([]);

// //     try {
// //         const embedding = await generateTextEmbedding(q);
        
// //         // קריאה לפונקציית הוקטורים ב-Supabase
// //         const { data, error } = await supabase.rpc('match_images', {
// //             query_embedding: embedding,
// //             match_threshold: 0.5,
// //             match_count: 12,
// //             p_user_email: email // סינון לפי משתמש!
// //         });

// //         if (error) throw error;
// //         res.json(data);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send("Search error");
// //     }
// // });
// router.get("/", async (req, res) => {
//     const { q, email } = req.query;
//     if (!q || !email) return res.json([]);

//     try {
//         console.log(`🔍 Searching for: "${q}" for user: ${email}`);
//         const embedding = await generateTextEmbedding(q);
        
//         const { data, error } = await supabase.rpc('match_images', {
//             query_embedding: embedding,
//             match_threshold: 0.2, // הורדנו קצת כדי להיות פחות נוקשים בבדיקה
//             match_count: 12,
//             p_user_email: email 
//         });

//         if (error) {
//             console.error("❌ Supabase RPC Error:", error.message);
//             throw error;
//         }

//         console.log(`✅ Found ${data?.length || 0} results`);
//         res.json(data);
//     } catch (err) {
//         console.error("❌ Search Route Error:", err);
//         res.status(500).send("Search error");
//     }
// });
// // פונקציה לסנכרון כל התמונות של משתמש
// export const syncUserImages = async (userEmail) => {
//     const drive = await getDriveClient(userEmail);
    
//     // 1. הבאת רשימת תמונות מהדרייב
//     const response = await drive.files.list({
//         q: "mimeType contains 'image/'",
//         fields: "files(id, name, thumbnailLink)",
//         pageSize: 50 // נתחיל מ-50 כדי לא להעמיס
//     });

//     const files = response.data.files;

//     for (const file of files) {
//         console.log(`🧠 AI Processing for ${userEmail}: ${file.name}`);

//         try {
//             // 2. כאן את צריכה את פונקציית ה-AI שלך (למשל CLIP או OpenAI)
//             // נניח שיש לך פונקציה getEmbedding
//             const vector = await getEmbedding(file.name); 

//             // 3. שמירה ל-Supabase - התאמה למבנה הטבלה החדש
//             const { error } = await supabase
//                 .from('images')
//                 .upsert({
//                     id: file.id,            // ID של גוגל
//                     user_email: userEmail,
//                     name: file.name,
//                     embedding: vector,      // הווקטור
//                     thumbnail_url: file.thumbnailLink,
//                     created_at: new Date()
//                 });

//             if (error) {
//                 console.error(`❌ שגיאה בשמירת ${file.name}:`, error.message);
//             } else {
//                 console.log(`✅ ${file.name} נשמרה ב-DB`);
//             }
//         } catch (err) {
//             console.error(`⚠️ דילוג על קובץ ${file.name}:`, err.message);
//         }
//     }
// };

// // פונקציה דמה להמחשה - כאן צריך לבוא ה-API של ה-AI שלך
// async function getEmbedding(text) {
//     // כאן אמורה להיות הקריאה למודל ה-AI שמחזיר מערך של 512 מספרים
//     // למשל: return await myAiModel.embed(text);
//     return new Array(512).fill(0).map(() => Math.random()); // זמני לבדיקה
// }
// export default router;
import express from "express";
import { supabase } from "../config/supabase.js";
import { generateTextEmbedding } from "../services/embeddingService.js";
import translate from "google-translate-api-x"; // ייבוא ספריית התרגום

const router = express.Router();

// router.get("/", async (req, res) => {
//     let { q, email } = req.query; // משתמשים ב-let כדי שנוכל לעדכן את q
//     if (!q || !email) return res.json([]);

//     try {
//         // 1. זיהוי עברית ותרגום אוטומטי
//         const hasHebrew = /[\u0590-\u05FF]/.test(q);
//         let searchQuery = q;

//         if (hasHebrew) {
//             console.log(`🇮🇱 Hebrew detected: "${q}"`);
//             try {
//                 const resTranslate = await translate(q, { to: 'en' });
//                 searchQuery = resTranslate.text;
//                 console.log(`🇺🇸 Translated to: "${searchQuery}"`);
//             } catch (transErr) {
//                 console.error("❌ Translation error, searching with original text:", transErr.message);
//             }
//         }

//         console.log(`🔍 Processing search for: "${searchQuery}" (Original: "${q}") for user: ${email}`);

//         // 2. יצירת וקטור מהטקסט (באנגלית)
//         const embedding = await generateTextEmbedding(searchQuery);
        
//         // 3. חיפוש ב-Supabase
//         const { data, error } = await supabase.rpc('match_images', {
//             query_embedding: embedding,
//             match_threshold: 0.2,
//             match_count: 12,
//             p_user_email: email 
//         });

//         if (error) {
//             console.error("❌ Supabase RPC Error:", error.message);
//             throw error;
//         }

//         console.log(`✅ Found ${data?.length || 0} results for user ${email}`);
//         res.json(data);

//     } catch (err) {
//         console.error("❌ Search Route Error:", err);
//         res.status(500).send("Search error");
//     }
// });
const translationCache = {}; // זיכרון זמני לתרגומים

router.get("/", async (req, res) => {
    let { q, email } = req.query;
    if (!q || !email) return res.json([]);

    try {
        const hasHebrew = /[\u0590-\u05FF]/.test(q);
        let searchQuery = q;

        if (hasHebrew) {
            // אם כבר תרגמנו את המילה הזו בעבר, ניקח מהזיכרון
            if (translationCache[q]) {
                searchQuery = translationCache[q];
            } else {
                const resTranslate = await translate(q, { to: 'en' });
                searchQuery = resTranslate.text;
                translationCache[q] = searchQuery; // שומרים לחיפוש הבא
            }
        }

        // יצירת Embedding - תוודאי שהפונקציה הזו לא טוענת את המודל מחדש!
        const embedding = await generateTextEmbedding(searchQuery);
        
        const { data, error } = await supabase.rpc('match_images', {
            query_embedding: embedding,
            match_threshold: 0.15,
            match_count: 12,
            p_user_email: email 
        });

        if (error) throw error;
        res.json(data);

    } catch (err) {
        res.status(500).send("Search error");
    }
});
// נתיב לחיפוש תמונות דומות לתמונה קיימת
router.get("/similar/:id", async (req, res) => {
    const { id } = req.params;
    const { email } = req.query;

    if (!id || !email) return res.status(400).send("Missing ID or Email");

    try {
        // 1. שליפת הווקטור של התמונה שנבחרה מה-DB
        const { data: sourceImage, error: fetchError } = await supabase
            .from('images')
            .select('embedding')
            .eq('id', id)
            .eq('user_email', email)
            .single();

        if (fetchError || !sourceImage) {
            return res.status(404).send("Source image not found");
        }

        // 2. חיפוש תמונות עם וקטור דומה (באמצעות אותה פונקציית RPC)
        const { data, error } = await supabase.rpc('match_images', {
            query_embedding: sourceImage.embedding,
            match_threshold: 0.3, // רגישות לדימיון
            match_count: 6,       // כמה תמונות דומות להחזיר
            p_user_email: email 
        });

        if (error) throw error;

        // סינון התמונה המקורית מהתוצאות (כדי שלא תופיע כדומה לעצמה)
        const filteredResults = data.filter(img => img.id !== id);
        
        res.json(filteredResults);
    } catch (err) {
        console.error("❌ Similar Search Error:", err);
        res.status(500).send("Error finding similar images");
    }
});

/**
 * הערה לגבי הפונקציה syncUserImages שהוספת למטה:
 * היא נמצאת כאן כרגע, אבל כדאי לוודא שהיא לא מתנגשת עם 
 * הפונקציה שכבר קיימת לך ב-drive.routes.js. 
 * המלצה שלי: תמחקי אותה מכאן ותשאירי אותה רק ב-drive.routes.js
 * כדי לשמור על סדר.
 */

export default router;