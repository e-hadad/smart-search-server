// // import fs from "fs";
// // import path from "path";
// // import { pipeline } from "@huggingface/transformers";

// // // path ל־DB
// // const DB_PATH = path.join("server", "db.json");

// // // טעינת DB
// // function loadDB() {
// //   return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
// // }

// // // שמירת DB
// // function saveDB(data) {
// //   fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
// // }

// // async function run() {
// //   console.log("🔹 Loading CLIP model...");
// //   const embedder = await pipeline(
// //     "feature-extraction",
// //     "Xenova/clip-vit-base-patch32"
// //   );

// //   console.log("🔹 Loading DB...");
// //   const images = loadDB();

// //   for (const img of images) {
// //     if (img.embedding) {
// //       console.log(`⏭️  Skipping ${img.name} (already embedded)`);
// //       continue;
// //     }

// //     console.log(`🧠 Embedding image name: ${img.name}`);

// //     // בשלב ראשון – embedding לפי שם הקובץ
// //     // (בהמשך נוריד את התמונה עצמה)
// //     const embedding = await embedder(img.name, {
// //       pooling: "mean",
// //       normalize: true
// //     });

// //     img.embedding = embedding[0];
// //   }

// //   saveDB(images);
// //   console.log("✅ Embeddings saved to DB");
// // }

// // run().catch(console.error);

// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import { pipeline, RawImage, env } from "@huggingface/transformers";
// import { downloadFile } from "../services/drive.service.js";

// // --- הגדרות נתיבים ---
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // הנתיב ל-db.json (נמצא בתיקייה שמעל scripts)
// const DB_PATH = path.resolve(__dirname, "../db.json");

// // --- הגדרות מודל מקומי לעקיפת חסימת אינטרנט ---
// env.allowRemoteModels = false;
// env.localModelPath = 'D:/year3/google-drive-smart-search/embeddings/';
// env.allowLocalModels = true;
// function loadDB() {
//     if (!fs.existsSync(DB_PATH)) {
//         console.log("⚠️ db.json not found, creating a new one.");
//         return [];
//     }
//     const data = fs.readFileSync(DB_PATH, "utf-8");
//     return data ? JSON.parse(data) : [];
// }

// function saveDB(data) {
//     fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
// }

// async function run() {
//     console.log("🚀 Script started...");

//     const images = loadDB();
//     console.log(`📂 DB Path: ${DB_PATH}`);
//     console.log(`📊 Total images in DB: ${images.length}`);

//     // סינון תמונות שעדיין אין להן Embedding
//     const toProcess = images.filter(img => !img.embedding || img.embedding.length === 0);

//     if (toProcess.length === 0) {
//         console.log("✅ All images already have embeddings or DB is empty.");
//         return;
//     }

//     console.log(`⏳ Found ${toProcess.length} images to process.`);

//     try {
//         console.log("🔹 Loading LOCAL CLIP model...");
//         // טעינת המודל מהתיקייה המקומית שהגדרנו ב-localModelPath
//         const embedder = await pipeline(
//             "feature-extraction",
//             "clip-vit-base-patch32"
//         );

//         for (const img of toProcess) {
//             try {
//                 console.log(`🧠 Processing image: ${img.name}...`);

//                 // 1. הורדה מהדרייב
//                 const buffer = await downloadFile(img.id);

//                 // 2. המרה לפורמט RawImage
//                 const blob = new Blob([buffer]);
//                 const image = await RawImage.fromBlob(blob);

//                 // 3. יצירת ה-Embedding
//                 const output = await embedder(image);
                
//                 // המרה למערך רגיל ושמירה
//                 img.embedding = Array.from(output.data);

//                 // שמירה ל-DB אחרי כל הצלחה
//                 saveDB(images);
//                 console.log(`✅ Success: ${img.name}`);

//             } catch (err) {
//                 console.error(`❌ Failed to process ${img.name}:`, err.message);
//                 // ממשיכים לתמונה הבאה גם אם אחת נכשלה
//             }
//         }
//     } catch (err) {
//         console.error("❌ Critical error loading model or processing:", err.message);
//     }

//     console.log("✨ Processing finished.");
// }

// // הרצה
// run().catch(err => console.error("🔥 Global Error:", err));
import fs from "fs";
import path from "path";
import { downloadFile } from "../services/drive.service.js";
import { generateImageEmbedding } from "../services/embeddingService.js";

const DB_PATH = path.resolve("db.json");

async function run() {
    if (!fs.existsSync(DB_PATH)) return console.log("❌ No db.json found");
    const images = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

    const toProcess = images.filter(img => !img.embedding || img.embedding.length === 0);
    console.log(`⏳ Processing ${toProcess.length} images...`);

    for (const img of toProcess) {
        try {
            console.log(`🧠 Embedding: ${img.name}`);
            const buffer = await downloadFile(img.id);
            img.embedding = await generateImageEmbedding(buffer);
            
            // שמירה מיידית למקרה של תקלה
            fs.writeFileSync(DB_PATH, JSON.stringify(images, null, 2));
            console.log(`✅ Done: ${img.name}`);
        } catch (err) {
            console.error(`❌ Error ${img.name}:`, err.message);
        }
    }
    console.log("✨ All images processed!");
}

run();