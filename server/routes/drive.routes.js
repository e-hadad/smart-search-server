// // // // // // // // // // // // // import express from "express";
// // // // // // // // // // // // // import { listFiles } from "../services/drive.service.js";

// // // // // // // // // // // // // const router = express.Router();

// // // // // // // // // // // // // router.get("/files", async (req, res) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const files = await listFiles();
// // // // // // // // // // // // //     res.json(files);
// // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // //     console.error(err);
// // // // // // // // // // // // //     res.status(500).send("Error fetching files");
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // export default router;

// // // // // // // // // // // // import express from "express";
// // // // // // // // // // // // import { listFiles,searchFiles } from "../services/drive.service.js";

// // // // // // // // // // // // const router = express.Router();

// // // // // // // // // // // // router.get("/files", async (req, res) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const files = await listFiles();
// // // // // // // // // // // //     res.json(files);
// // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // //     console.error(err);
// // // // // // // // // // // //     res.status(500).send("Error fetching files");
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // export default router;

// // // // // // // // // // // // router.get("/search", async (req, res) => {
// // // // // // // // // // // //   const { q } = req.query;
// // // // // // // // // // // //   if (!q) return res.status(400).send("Query missing");
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const results = await searchFiles(q);
// // // // // // // // // // // //     res.json(results);
// // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // //     console.error(err);
// // // // // // // // // // // //     res.status(500).send("Error searching files");
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // import express from "express";
// // // // // // // // // // // import { listFiles } from "../services/drive.service.js";
// // // // // // // // // // // import { downloadFile } from "../services/drive.service.js";
// // // // // // // // // // // const router = express.Router();

// // // // // // // // // // // // נתיב שמציג את כל הקבצים שנמצאו בדרייב (לצורך בדיקה)
// // // // // // // // // // // router.get("/files", async (req, res) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const files = await listFiles();
// // // // // // // // // // //     res.json(files);
// // // // // // // // // // //   } catch (err) {
// // // // // // // // // // //     console.error(err);
// // // // // // // // // // //     res.status(500).send("Error fetching files from Google Drive");
// // // // // // // // // // //   }
// // // // // // // // // // // });
// // // // // // // // // // // // נתיב להצגת התמונה עצמה
// // // // // // // // // // // router.get("/view/:fileId", async (req, res) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const { fileId } = req.params;
// // // // // // // // // // //     const buffer = await downloadFile(fileId); // הפונקציה שכבר קיימת אצלך
    
// // // // // // // // // // //     res.set("Content-Type", "image/jpeg"); // מגדיר לדפדפן שזה קובץ תמונה
// // // // // // // // // // //     res.send(buffer);
// // // // // // // // // // //   } catch (err) {
// // // // // // // // // // //     console.error("Error serving image:", err);
// // // // // // // // // // //     res.status(500).send("Error serving image");
// // // // // // // // // // //   }
// // // // // // // // // // // });
// // // // // // // // // // // export default router;

// // // // // // // // // // import express from "express";
// // // // // // // // // // import { listFiles, downloadFile } from "../services/drive.service.js";
// // // // // // // // // // import { generateImageEmbedding } from "../services/embeddingService.js";
// // // // // // // // // // import fs from "fs";
// // // // // // // // // // import path from "path";

// // // // // // // // // // const router = express.Router();
// // // // // // // // // // const DB_PATH = path.resolve("db.json");

// // // // // // // // // // // משתנה שישמור את ה"סימניה" האחרונה שלנו בגוגל
// // // // // // // // // // let lastPageToken = null;

// // // // // // // // // // // הצגת התמונה (לשימוש בתוך ה-Search)
// // // // // // // // // // router.get("/view/:fileId", async (req, res) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { fileId } = req.params;
// // // // // // // // // //         const buffer = await downloadFile(fileId);
// // // // // // // // // //         res.set("Content-Type", "image/jpeg");
// // // // // // // // // //         res.send(buffer);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //         res.status(500).send("Error serving image");
// // // // // // // // // //     }
// // // // // // // // // // });

// // // // // // // // // // // סנכרון חכם - הופך את זה למוצר אמיתי!
// // // // // // // // // // router.post("/sync", async (req, res) => {
// // // // // // // // // //     try {
// // // // // // // // // //         console.log("🔄 Starting Incremental Sync...");
        
// // // // // // // // // //         // 1. קריאת ה-DB הקיים
// // // // // // // // // //         let dbData = fs.existsSync(DB_PATH) ? JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) : [];
// // // // // // // // // //         const existingIds = new Set(dbData.map(img => img.id));

// // // // // // // // // //         // 2. הבאת רשימה מעודכנת מהדרייב
// // // // // // // // // //         const driveFiles = await listFiles();
        
// // // // // // // // // //         // 3. סינון: רק קבצים שלא קיימים ב-DB
// // // // // // // // // //         const newFiles = driveFiles.filter(file => !existingIds.has(file.id));

// // // // // // // // // //         console.log(`📊 Status: ${dbData.length} existing, ${newFiles.length} new to process.`);

// // // // // // // // // //         if (newFiles.length === 0) {
// // // // // // // // // //             return res.json({ message: "Everything is up to date!", added: 0 });
// // // // // // // // // //         }

// // // // // // // // // //         // 4. עיבוד רק של החדשים
// // // // // // // // // //         for (const file of newFiles) {
// // // // // // // // // //             console.log(`🧠 AI Processing new image: ${file.name}`);
// // // // // // // // // //             try {
// // // // // // // // // //                 const buffer = await downloadFile(file.id);
// // // // // // // // // //                 const embedding = await generateImageEmbedding(buffer);
                
// // // // // // // // // //                 dbData.push({ 
// // // // // // // // // //                     id: file.id, 
// // // // // // // // // //                     name: file.name, 
// // // // // // // // // //                     embedding, 
// // // // // // // // // //                     mimeType: file.mimeType 
// // // // // // // // // //                 });

// // // // // // // // // //                 // שמירה אחרי כל תמונה כדי שאם תפסיקי באמצע, מה שנעשה - נשמר
// // // // // // // // // //                 fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2));
// // // // // // // // // //             } catch (fileErr) {
// // // // // // // // // //                 console.error(`❌ Skip ${file.name} due to error`);
// // // // // // // // // //             }
// // // // // // // // // //         }

// // // // // // // // // //         res.json({ message: "Sync complete", added: newFiles.length });
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //         console.error("❌ Sync Error:", err);
// // // // // // // // // //         res.status(500).json({ error: "Sync failed" });
// // // // // // // // // //     }
// // // // // // // // // // });
// // // // // // // // // // async function syncChanges() {
// // // // // // // // // //   try {
// // // // // // // // // //     // 1. אם זו פעם ראשונה, נבקש מגוגל "סימניה" (Token) התחלתית
// // // // // // // // // //     if (!lastPageToken) {
// // // // // // // // // //       const response = await drive.changes.getStartPageToken({});
// // // // // // // // // //       lastPageToken = response.data.startPageToken;
// // // // // // // // // //       console.log('נוצר טוקן ראשוני:', lastPageToken);
// // // // // // // // // //       // כאן נריץ סריקה מלאה ראשונית
// // // // // // // // // //       return await fullScan(); 
// // // // // // // // // //     }

// // // // // // // // // //     // 2. נשאל את גוגל: "מה השתנה מאז הטוקן האחרון?"
// // // // // // // // // //     const response = await drive.changes.list({
// // // // // // // // // //       pageToken: lastPageToken,
// // // // // // // // // //       fields: 'newStartPageToken, changes(fileId, removed, file(name, mimeType))',
// // // // // // // // // //     });

// // // // // // // // // //     const changes = response.data.changes;

// // // // // // // // // //     for (const change of changes) {
// // // // // // // // // //       if (change.removed || (change.file && change.file.trashed)) {
// // // // // // // // // //         // מחיקה מהאינדקס המקומי
// // // // // // // // // //         removeImageFromIndex(change.fileId);
// // // // // // // // // //       } else if (change.file && change.file.mimeType.startsWith('image/')) {
// // // // // // // // // //         // הוספה או עדכון של תמונה חדשה בלבד
// // // // // // // // // //         await processNewImage(change.fileId, change.file.name);
// // // // // // // // // //       }
// // // // // // // // // //     }

// // // // // // // // // //     // 3. נעדכן את הסימניה לפעם הבאה
// // // // // // // // // //     lastPageToken = response.data.newStartPageToken;
// // // // // // // // // //     saveTokenToLocalDB(lastPageToken); // נשמור את זה בקובץ כדי שלא יאבד בריסטארט

// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('שגיאה בסנכרון שינויים:', error);
// // // // // // // // // //   }
// // // // // // // // // // }
// // // // // // // // // // export default router;
// // // // // // // // // import express from "express";
// // // // // // // // // import { listFiles, downloadFile, getDriveClient } from "../services/drive.service.js"; // הוספתי את getDriveClient
// // // // // // // // // import { generateImageEmbedding } from "../services/embeddingService.js";
// // // // // // // // // import fs from "fs";
// // // // // // // // // import path from "path";

// // // // // // // // // const router = express.Router();
// // // // // // // // // const DB_PATH = path.resolve("db.json");
// // // // // // // // // const TOKEN_PATH = path.resolve("sync_token.json"); // קובץ לשמירת ה"סימניה"

// // // // // // // // // // עזר: קריאת ה-DB
// // // // // // // // // const getDB = () => fs.existsSync(DB_PATH) ? JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) : { images: [], lastToken: null };
// // // // // // // // // // עזר: שמירת ה-DB
// // // // // // // // // const saveDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// // // // // // // // // // הצגת תמונה (View)
// // // // // // // // // router.get("/view/:fileId", async (req, res) => {
// // // // // // // // //     try {
// // // // // // // // //         const { fileId } = req.params;
// // // // // // // // //         const buffer = await downloadFile(fileId);
// // // // // // // // //         res.set("Content-Type", "image/jpeg");
// // // // // // // // //         res.send(buffer);
// // // // // // // // //     } catch (err) {
// // // // // // // // //         res.status(500).send("Error serving image");
// // // // // // // // //     }
// // // // // // // // // });

// // // // // // // // // // סנכרון חכם (Incremental & Smart Sync)
// // // // // // // // // router.post("/sync", async (req, res) => {
// // // // // // // // //     try {
// // // // // // // // //         console.log("🔄 Starting Smart Sync...");
// // // // // // // // //         const drive = await getDriveClient();
// // // // // // // // //         let dbData = getDB();
        
// // // // // // // // //         // אם זה המבנה הישן (רק מערך), נהפוך אותו למבנה החדש
// // // // // // // // //         if (Array.isArray(dbData)) {
// // // // // // // // //             dbData = { images: dbData, lastToken: null };
// // // // // // // // //         }

// // // // // // // // //         // 1. קבלת טוקן התחלתי אם אין כזה
// // // // // // // // //         if (!dbData.lastToken) {
// // // // // // // // //             console.log("🆕 Initial sync - generating first token...");
// // // // // // // // //             const tokenRes = await drive.changes.getStartPageToken({});
// // // // // // // // //             dbData.lastToken = tokenRes.data.startPageToken;
            
// // // // // // // // //             // בצעי סריקה מלאה ראשונית
// // // // // // // // //             const driveFiles = await listFiles();
// // // // // // // // //             const existingIds = new Set(dbData.images.map(img => img.id));
// // // // // // // // //             const newFiles = driveFiles.filter(f => !existingIds.has(f.id));

// // // // // // // // //             for (const file of newFiles) {
// // // // // // // // //                 await processImage(file, dbData);
// // // // // // // // //             }
// // // // // // // // //         } else {
// // // // // // // // //             // 2. סנכרון שינויים בלבד (הוספות ומחיקות)
// // // // // // // // //             console.log("📡 Fetching changes from Drive since last sync...");
// // // // // // // // //             const response = await drive.changes.list({
// // // // // // // // //                 pageToken: dbData.lastToken,
// // // // // // // // //                 fields: 'newStartPageToken, changes(fileId, removed, file(name, mimeType, trashed))',
// // // // // // // // //             });

// // // // // // // // //             for (const change of response.data.changes) {
// // // // // // // // //                 const isRemoved = change.removed || (change.file && change.file.trashed);
                
// // // // // // // // //                 if (isRemoved) {
// // // // // // // // //                     console.log(`🗑️ Removing image from index: ${change.fileId}`);
// // // // // // // // //                     dbData.images = dbData.images.filter(img => img.id !== change.fileId);
// // // // // // // // //                 } else if (change.file && change.file.mimeType?.startsWith('image/')) {
// // // // // // // // //                     const exists = dbData.images.some(img => img.id === change.fileId);
// // // // // // // // //                     if (!exists) {
// // // // // // // // //                         await processImage({ id: change.fileId, name: change.file.name, mimeType: change.file.mimeType }, dbData);
// // // // // // // // //                     }
// // // // // // // // //                 }
// // // // // // // // //             }
// // // // // // // // //             dbData.lastToken = response.data.newStartPageToken;
// // // // // // // // //         }

// // // // // // // // //         saveDB(dbData);
// // // // // // // // //         res.json({ message: "Sync complete", totalImages: dbData.images.length });
// // // // // // // // //     } catch (err) {
// // // // // // // // //         console.error("❌ Sync Error:", err);
// // // // // // // // //         res.status(500).json({ error: "Sync failed" });
// // // // // // // // //     }
// // // // // // // // // });

// // // // // // // // // // פונקציית עזר לעיבוד תמונה בודדת
// // // // // // // // // async function processImage(file, dbData) {
// // // // // // // // //     try {
// // // // // // // // //         console.log(`🧠 AI Processing: ${file.name}`);
// // // // // // // // //         const buffer = await downloadFile(file.id);
// // // // // // // // //         const embedding = await generateImageEmbedding(buffer);
        
// // // // // // // // //         dbData.images.push({ 
// // // // // // // // //             id: file.id, 
// // // // // // // // //             name: file.name, 
// // // // // // // // //             embedding, 
// // // // // // // // //             mimeType: file.mimeType 
// // // // // // // // //         });
// // // // // // // // //         saveDB(dbData); // שמירה מיידית למניעת אובדן נתונים
// // // // // // // // //     } catch (e) {
// // // // // // // // //         console.error(`❌ Failed to process ${file.name}:`, e.message);
// // // // // // // // //     }
// // // // // // // // // }

// // // // // // // // // export default router;
// // // // // // // // import express from "express";
// // // // // // // // import { listFiles, downloadFile, getDriveClient } from "../services/drive.service.js";
// // // // // // // // import { generateImageEmbedding } from "../services/embeddingService.js";
// // // // // // // // import fs from "fs";
// // // // // // // // import path from "path";

// // // // // // // // const router = express.Router();
// // // // // // // // const DB_PATH = path.resolve("db.json");

// // // // // // // // const getDB = () => {
// // // // // // // //     if (!fs.existsSync(DB_PATH)) return { images: [], lastToken: null };
// // // // // // // //     try {
// // // // // // // //         const data = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
// // // // // // // //         return Array.isArray(data) ? { images: data, lastToken: null } : data;
// // // // // // // //     } catch (e) {
// // // // // // // //         return { images: [], lastToken: null };
// // // // // // // //     }
// // // // // // // // };

// // // // // // // // const saveDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// // // // // // // // router.get("/view/:fileId", async (req, res) => {
// // // // // // // //     try {
// // // // // // // //         const buffer = await downloadFile(req.params.fileId);
// // // // // // // //         res.set("Content-Type", "image/jpeg");
// // // // // // // //         res.send(buffer);
// // // // // // // //     } catch (err) {
// // // // // // // //         res.status(500).send("Error serving image");
// // // // // // // //     }
// // // // // // // // });

// // // // // // // // router.post("/sync", async (req, res) => {
// // // // // // // //     try {
// // // // // // // //         console.log("🔄 Starting Smart Sync...");
// // // // // // // //         const drive = await getDriveClient();
// // // // // // // //         let dbData = getDB();

// // // // // // // //         if (!dbData.lastToken) {
// // // // // // // //             const tokenRes = await drive.changes.getStartPageToken({});
// // // // // // // //             dbData.lastToken = tokenRes.data.startPageToken;
// // // // // // // //             const driveFiles = await listFiles();
// // // // // // // //             for (const file of driveFiles) {
// // // // // // // //                 await processImage(file, dbData);
// // // // // // // //             }
// // // // // // // //         } else {
// // // // // // // //             const response = await drive.changes.list({
// // // // // // // //                 pageToken: dbData.lastToken,
// // // // // // // //                 fields: 'newStartPageToken, changes(fileId, removed, file(name, mimeType, trashed))',
// // // // // // // //             });
// // // // // // // //             for (const change of response.data.changes) {
// // // // // // // //                 if (change.removed || change.file?.trashed) {
// // // // // // // //                     dbData.images = dbData.images.filter(img => img.id !== change.fileId);
// // // // // // // //                 } else if (change.file?.mimeType?.startsWith('image/')) {
// // // // // // // //                     await processImage({ id: change.fileId, name: change.file.name }, dbData);
// // // // // // // //                 }
// // // // // // // //             }
// // // // // // // //             dbData.lastToken = response.data.newStartPageToken;
// // // // // // // //         }
// // // // // // // //         saveDB(dbData);
// // // // // // // //         res.json({ message: "Sync complete", total: dbData.images.length });
// // // // // // // //     } catch (err) {
// // // // // // // //         console.error("Sync Error:", err);
// // // // // // // //         res.status(500).json({ error: "Sync failed" });
// // // // // // // //     }
// // // // // // // // });

// // // // // // // // async function processImage(file, dbData) {
// // // // // // // //     if (dbData.images.some(img => img.id === file.id)) return;
// // // // // // // //     try {
// // // // // // // //         console.log(`🧠 AI Processing: ${file.name}`);
// // // // // // // //         const buffer = await downloadFile(file.id);
// // // // // // // //         const embedding = await generateImageEmbedding(buffer);
// // // // // // // //         dbData.images.push({ id: file.id, name: file.name, embedding });
// // // // // // // //         saveDB(dbData); 
// // // // // // // //     } catch (e) {
// // // // // // // //         console.error(`Error processing ${file.name}`);
// // // // // // // //     }
// // // // // // // // }

// // // // // // // // export default router;
// // // // // // // import express from "express";
// // // // // // // import { listFiles, downloadFile, getDriveClient } from "../services/drive.service.js";
// // // // // // // import { generateImageEmbedding } from "../services/embeddingService.js";
// // // // // // // import fs from "fs";
// // // // // // // import path from "path";

// // // // // // // const router = express.Router();
// // // // // // // const DB_PATH = path.resolve("db.json");

// // // // // // // const getDB = () => {
// // // // // // //     if (!fs.existsSync(DB_PATH)) return { images: [], lastToken: null };
// // // // // // //     try {
// // // // // // //         const data = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
// // // // // // //         return Array.isArray(data) ? { images: data, lastToken: null } : data;
// // // // // // //     } catch (e) {
// // // // // // //         return { images: [], lastToken: null };
// // // // // // //     }
// // // // // // // };

// // // // // // // const saveDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// // // // // // // // --- פונקציית הלוגיקה החדשה שניתן לייצא ---
// // // // // // // export const syncDriveLogic = async () => {
// // // // // // //     console.log("🔄 Starting Smart Sync...");
// // // // // // //     const drive = await getDriveClient();
// // // // // // //     let dbData = getDB();

// // // // // // //     if (!dbData.lastToken) {
// // // // // // //         const tokenRes = await drive.changes.getStartPageToken({});
// // // // // // //         dbData.lastToken = tokenRes.data.startPageToken;
// // // // // // //         const driveFiles = await listFiles();
// // // // // // //         for (const file of driveFiles) {
// // // // // // //             await processImage(file, dbData);
// // // // // // //         }
// // // // // // //     } else {
// // // // // // //         const response = await drive.changes.list({
// // // // // // //             pageToken: dbData.lastToken,
// // // // // // //             fields: 'newStartPageToken, changes(fileId, removed, file(name, mimeType, trashed))',
// // // // // // //         });
// // // // // // //         for (const change of response.data.changes) {
// // // // // // //             if (change.removed || change.file?.trashed) {
// // // // // // //                 dbData.images = dbData.images.filter(img => img.id !== change.fileId);
// // // // // // //             } else if (change.file?.mimeType?.startsWith('image/')) {
// // // // // // //                 await processImage({ id: change.fileId, name: change.file.name }, dbData);
// // // // // // //             }
// // // // // // //         }
// // // // // // //         dbData.lastToken = response.data.newStartPageToken;
// // // // // // //     }
// // // // // // //     saveDB(dbData);
// // // // // // //     return dbData.images.length;
// // // // // // // };

// // // // // // // async function processImage(file, dbData) {
// // // // // // //     if (dbData.images.some(img => img.id === file.id)) return;
// // // // // // //     try {
// // // // // // //         console.log(`🧠 AI Processing: ${file.name}`);
// // // // // // //         const buffer = await downloadFile(file.id);
// // // // // // //         const embedding = await generateImageEmbedding(buffer);
// // // // // // //         dbData.images.push({ id: file.id, name: file.name, embedding });
// // // // // // //         saveDB(dbData); 
// // // // // // //     } catch (e) {
// // // // // // //         console.error(`Error processing ${file.name}`);
// // // // // // //     }
// // // // // // // }

// // // // // // // // נתיב ה-View נשאר אותו דבר
// // // // // // // router.get("/view/:fileId", async (req, res) => {
// // // // // // //     try {
// // // // // // //         const buffer = await downloadFile(req.params.fileId);
// // // // // // //         res.set("Content-Type", "image/jpeg");
// // // // // // //         res.send(buffer);
// // // // // // //     } catch (err) {
// // // // // // //         res.status(500).send("Error serving image");
// // // // // // //     }
// // // // // // // });

// // // // // // // // נתיב ה-Sync קורא עכשיו לפונקציה המשותפת
// // // // // // // router.post("/sync", async (req, res) => {
// // // // // // //     try {
// // // // // // //         const total = await syncDriveLogic();
// // // // // // //         res.json({ message: "Sync complete", total });
// // // // // // //     } catch (err) {
// // // // // // //         console.error("Sync Error:", err);
// // // // // // //         res.status(500).json({ error: "Sync failed" });
// // // // // // //     }
// // // // // // // });

// // // // // // // export default router;
// // // // // // import express from "express";
// // // // // // import { listFiles, downloadFile, getDriveClient } from "../services/drive.service.js";
// // // // // // import { generateImageEmbedding } from "../services/embeddingService.js";
// // // // // // import fs from "fs";
// // // // // // import path from "path";

// // // // // // const router = express.Router();
// // // // // // const DB_PATH = path.resolve("db.json");

// // // // // // const getDB = () => {
// // // // // //     if (!fs.existsSync(DB_PATH)) return { images: [], lastToken: null };
// // // // // //     try {
// // // // // //         const data = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
// // // // // //         return Array.isArray(data) ? { images: data, lastToken: null } : data;
// // // // // //     } catch (e) {
// // // // // //         return { images: [], lastToken: null };
// // // // // //     }
// // // // // // };

// // // // // // const saveDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// // // // // // // --- פונקציית הלוגיקה החדשה שניתן לייצא ---
// // // // // // export const syncDriveLogic = async () => {
// // // // // //     console.log("🔄 Starting Smart Sync...");
// // // // // //     const drive = await getDriveClient();
// // // // // //     let dbData = getDB();

// // // // // //     if (!dbData.lastToken) {
// // // // // //         const tokenRes = await drive.changes.getStartPageToken({});
// // // // // //         dbData.lastToken = tokenRes.data.startPageToken;
// // // // // //         const driveFiles = await listFiles();
// // // // // //         for (const file of driveFiles) {
// // // // // //             await processImage(file, dbData);
// // // // // //         }
// // // // // //     } else {
// // // // // //         const response = await drive.changes.list({
// // // // // //             pageToken: dbData.lastToken,
// // // // // //             fields: 'newStartPageToken, changes(fileId, removed, file(name, mimeType, trashed))',
// // // // // //         });
// // // // // //         for (const change of response.data.changes) {
// // // // // //             if (change.removed || change.file?.trashed) {
// // // // // //                 dbData.images = dbData.images.filter(img => img.id !== change.fileId);
// // // // // //             } else if (change.file?.mimeType?.startsWith('image/')) {
// // // // // //                 await processImage({ id: change.fileId, name: change.file.name }, dbData);
// // // // // //             }
// // // // // //         }
// // // // // //         dbData.lastToken = response.data.newStartPageToken;
// // // // // //     }
// // // // // //     saveDB(dbData);
// // // // // //     return dbData.images.length;
// // // // // // };

// // // // // // // async function processImage(file, dbData) {
// // // // // // //     if (dbData.images.some(img => img.id === file.id)) return;
// // // // // // //     try {
// // // // // // //         console.log(`🧠 AI Processing: ${file.name}`);
// // // // // // //         const buffer = await downloadFile(file.id);
// // // // // // //         const embedding = await generateImageEmbedding(buffer);
// // // // // // //         dbData.images.push({ id: file.id, name: file.name, embedding });
// // // // // // //         saveDB(dbData); 
// // // // // // //     } catch (e) {
// // // // // // //         console.error(`Error processing ${file.name}`);
// // // // // // //     }
// // // // // // // }
// // // // // // async function processImage(file, dbData) {
// // // // // //     if (dbData.images.some(img => img.id === file.id)) return;
// // // // // //     try {
// // // // // //         console.log(`🧠 AI Processing: ${file.name}`);
// // // // // //         const buffer = await downloadFile(file.id);
// // // // // //         const embedding = await generateImageEmbedding(buffer);
        
// // // // // //         // שמירת ה-thumbnailLink ב-DB
// // // // // //         dbData.images.push({ 
// // // // // //             id: file.id, 
// // // // // //             name: file.name, 
// // // // // //             embedding, 
// // // // // //             thumbnail: file.thumbnailLink // שומרים את הלינק מגוגל
// // // // // //         });
// // // // // //         saveDB(dbData);
// // // // // //     } catch (e) {
// // // // // //         console.error(`Error processing ${file.name}`);
// // // // // //     }
// // // // // // }
// // // // // // // נתיב ה-View נשאר אותו דבר
// // // // // // router.get("/view/:fileId", async (req, res) => {
// // // // // //     try {
// // // // // //         const buffer = await downloadFile(req.params.fileId);
// // // // // //         res.set("Content-Type", "image/jpeg");
// // // // // //         res.send(buffer);
// // // // // //     } catch (err) {
// // // // // //         res.status(500).send("Error serving image");
// // // // // //     }
// // // // // // });

// // // // // // // נתיב ה-Sync קורא עכשיו לפונקציה המשותפת
// // // // // // router.post("/sync", async (req, res) => {
// // // // // //     try {
// // // // // //         const total = await syncDriveLogic();
// // // // // //         res.json({ message: "Sync complete", total });
// // // // // //     } catch (err) {
// // // // // //         console.error("Sync Error:", err);
// // // // // //         res.status(500).json({ error: "Sync failed" });
// // // // // //     }
// // // // // // });

// // // // // // export default router;
// // // // // import express from "express";
// // // // // import pool from "../config/db.js";
// // // // // import { listFiles, downloadFile, getDriveClient } from "../services/drive.service.js";
// // // // // import { generateImageEmbedding } from "../services/embeddingService.js";

// // // // // const router = express.Router();

// // // // // /**
// // // // //  * פונקציית הלוגיקה המרכזית לסנכרון
// // // // //  */
// // // // // // export const syncDriveLogic = async (userEmail = 'admin@local.com') => {
// // // // // //     console.log(`🔄 Starting Smart Sync for: ${userEmail}`);
// // // // // //     const drive = await getDriveClient();

// // // // // //     // 1. קבלת ID של המשתמש מה-DB (או יצירה אם לא קיים)
// // // // // //     const userResult = await pool.query(
// // // // // //         'INSERT INTO users (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET last_sync = CURRENT_TIMESTAMP RETURNING id',
// // // // // //         [userEmail]
// // // // // //     );
// // // // // //     const userId = userResult.rows[0].id;

// // // // // //     // 2. הבאת כל התמונות הקיימות כרגע בדרייב (שאינן באשפה)
// // // // // //     const driveFiles = await listFiles();
// // // // // //     const driveFileIds = driveFiles.map(f => f.id);

// // // // // //     console.log(`📂 Found ${driveFiles.length} images in Drive.`);

// // // // // //     // 3. טיפול באשפה: מחיקה מה-DB של תמונות שכבר לא קיימות בדרייב
// // // // // //     const deleteRes = await pool.query(
// // // // // //         'DELETE FROM images WHERE user_id = $1 AND NOT (google_file_id = ANY($2))',
// // // // // //         [userId, driveFileIds]
// // // // // //     );
// // // // // //     if (deleteRes.rowCount > 0) {
// // // // // //         console.log(`🗑️ Removed ${deleteRes.rowCount} deleted images from DB.`);
// // // // // //     }

// // // // // //     // 4. עיבוד והוספת תמונות חדשות
// // // // // //     let addedCount = 0;
// // // // // //     for (const file of driveFiles) {
// // // // // //         // בדיקה אם הקובץ כבר קיים אצלנו
// // // // // //         const existCheck = await pool.query(
// // // // // //             'SELECT id FROM images WHERE user_id = $1 AND google_file_id = $2',
// // // // // //             [userId, file.id]
// // // // // //         );

// // // // // //         if (existCheck.rows.length === 0) {
// // // // // //             try {
// // // // // //                 console.log(`🧠 AI Processing new image: ${file.name}`);
// // // // // //                 const buffer = await downloadFile(file.id);
// // // // // //                 const embedding = await generateImageEmbedding(buffer);

// // // // // //                 await pool.query(
// // // // // //                     'INSERT INTO images (user_id, google_file_id, name, thumbnail_url, embedding) VALUES ($1, $2, $3, $4, $5)',
// // // // // //                     [userId, file.id, file.name, file.thumbnailLink, JSON.stringify(embedding)]
// // // // // //                 );
// // // // // //                 addedCount++;
// // // // // //             } catch (err) {
// // // // // //                 console.error(`❌ Error processing ${file.name}:`, err.message);
// // // // // //             }
// // // // // //         }
// // // // // //     }

// // // // // //     const totalCount = await pool.query('SELECT COUNT(*) FROM images WHERE user_id = $1', [userId]);
// // // // // //     return { added: addedCount, total: parseInt(totalCount.rows[0].count) };
// // // // // // };


// // // // // export const syncDriveLogic = async (userEmail = 'admin@local.com') => {
// // // // //     console.log(`🔄 Starting Smart Sync for: ${userEmail}`);
// // // // //     const drive = await getDriveClient();

// // // // //     // 1. קבלת ID של המשתמש
// // // // //     const userResult = await pool.query(
// // // // //         'INSERT INTO users (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET last_sync = CURRENT_TIMESTAMP RETURNING id',
// // // // //         [userEmail]
// // // // //     );
// // // // //     const userId = userResult.rows[0].id;

// // // // //     // 2. הבאת הקבצים מהדרייב
// // // // //     const driveFiles = await listFiles();
// // // // //     const driveFileIds = driveFiles.map(f => f.id);

// // // // //     // 3. מחיקת קבצים שאינם בדרייב (ניקוי אשפה)
// // // // //     await pool.query(
// // // // //         'DELETE FROM images WHERE user_id = $1 AND NOT (google_file_id = ANY($2))',
// // // // //         [userId, driveFileIds]
// // // // //     );

// // // // //     // 4. עיבוד תמונות חדשות בלבד
// // // // //     let addedCount = 0;
// // // // //     for (const file of driveFiles) {
// // // // //         // בדיקה מקדימה: האם הקובץ כבר קיים ב-DB?
// // // // //         const existCheck = await pool.query(
// // // // //             'SELECT id FROM images WHERE user_id = $1 AND google_file_id = $2',
// // // // //             [userId, file.id]
// // // // //         );

// // // // //         if (existCheck.rows.length === 0) {
// // // // //             try {
// // // // //                 console.log(`🧠 AI Processing new image: ${file.name}`);
// // // // //                 const buffer = await downloadFile(file.id);
// // // // //                 const embedding = await generateImageEmbedding(buffer);

// // // // //                 await pool.query(
// // // // //                     'INSERT INTO images (user_id, google_file_id, name, thumbnail_url, embedding) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
// // // // //                     [userId, file.id, file.name, file.thumbnailLink, JSON.stringify(embedding)]
// // // // //                 );
// // // // //                 addedCount++;
// // // // //             } catch (err) {
// // // // //                 console.error(`❌ Error processing ${file.name}:`, err.message);
// // // // //             }
// // // // //         }
// // // // //     }

// // // // //     // שליפת המספר הסופי של התמונות ב-DB
// // // // //     const countRes = await pool.query('SELECT COUNT(*) FROM images WHERE user_id = $1', [userId]);
// // // // //     const total = parseInt(countRes.rows[0].count);

// // // // //     console.log(`✅ Sync finished. Added: ${addedCount}, Total in DB: ${total}`);
// // // // //     return { added: addedCount, total: total };
// // // // // };



// // // // // // --- Routes ---

// // // // // // הצגת תמונה (Proxy)
// // // // // router.get("/view/:fileId", async (req, res) => {
// // // // //     try {
// // // // //         const buffer = await downloadFile(req.params.fileId);
// // // // //         res.set("Content-Type", "image/jpeg");
// // // // //         res.send(buffer);
// // // // //     } catch (err) {
// // // // //         console.error("View Error:", err.message);
// // // // //         res.status(500).send("Error serving image");
// // // // //     }
// // // // // });

// // // // // // סנכרון ידני מה-UI
// // // // // router.post("/sync", async (req, res) => {
// // // // //     try {
// // // // //         // כרגע משתמשים באימייל דיפולטיבי עד שנחבר Auth מלא
// // // // //         const result = await syncDriveLogic('admin@local.com');
// // // // //         res.json({ message: "Sync complete", ...result });
// // // // //     } catch (err) {
// // // // //         console.error("Sync Route Error:", err);
// // // // //         res.status(500).json({ error: "Sync failed" });
// // // // //     }
// // // // // });

// // // // // export default router;
// // // // import express from "express";
// // // // import pool from "../config/db.js";
// // // // import { listFiles, downloadFile, getDriveClient } from "../services/drive.service.js";
// // // // import { generateImageEmbedding } from "../services/embeddingService.js";

// // // // const router = express.Router();

// // // // /**
// // // //  * פונקציית הלוגיקה המרכזית לסנכרון - כולל ניקוי והוספה
// // // //  */
// // // // export const syncDriveLogic = async (userEmail = 'admin@local.com') => {
// // // //     console.log(`🔄 Starting Smart Sync for: ${userEmail}`);
    
// // // //     // 1. קבלת ID של המשתמש מה-DB
// // // //     const userResult = await pool.query(
// // // //         'INSERT INTO users (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET last_sync = CURRENT_TIMESTAMP RETURNING id',
// // // //         [userEmail]
// // // //     );
// // // //     const userId = userResult.rows[0].id;

// // // //     // 2. הבאת רשימת הקבצים העדכנית מהדרייב
// // // //     const driveFiles = await listFiles();
// // // //     const driveFileIds = driveFiles.map(f => f.id);

// // // //     console.log(`📂 Found ${driveFiles.length} images in Drive. checking for deletions...`);

// // // //     // 3. מחיקת קבצים מה-DB שאינם קיימים יותר בדרייב (שלב ה-Integrity)
// // // //     const deleteRes = await pool.query(
// // // //         'DELETE FROM images WHERE user_id = $1 AND NOT (google_file_id = ANY($2))',
// // // //         [userId, driveFileIds]
// // // //     );
// // // //     const deletedCount = deleteRes.rowCount;
// // // //     if (deletedCount > 0) {
// // // //         console.log(`🗑️ Cleanup: Removed ${deletedCount} stale images from DB.`);
// // // //     }

// // // //     // 4. עיבוד תמונות חדשות בלבד
// // // //     let addedCount = 0;
// // // //     for (const file of driveFiles) {
// // // //         // בדיקה: האם הקובץ כבר עבר עיבוד AI בעבר?
// // // //         const existCheck = await pool.query(
// // // //             'SELECT id FROM images WHERE user_id = $1 AND google_file_id = $2',
// // // //             [userId, file.id]
// // // //         );

// // // //         if (existCheck.rows.length === 0) {
// // // //             try {
// // // //                 console.log(`🧠 AI Processing [NEW]: ${file.name}`);
                
// // // //                 // הורדה ויצירת Embedding
// // // //                 const buffer = await downloadFile(file.id);
// // // //                 const embedding = await generateImageEmbedding(buffer);

// // // //                 // שמירה ב-DB עם וקטור ה-AI
// // // //                 await pool.query(
// // // //                     'INSERT INTO images (user_id, google_file_id, name, thumbnail_url, embedding) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
// // // //                     [userId, file.id, file.name, file.thumbnailLink, JSON.stringify(embedding)]
// // // //                 );
// // // //                 addedCount++;
// // // //             } catch (err) {
// // // //                 console.error(`❌ Error processing ${file.name}:`, err.message);
// // // //                 // ממשיכים לקובץ הבא גם אם אחד נכשל
// // // //             }
// // // //         }
// // // //     }

// // // //     // 5. סיכום נתונים סופי
// // // //     const countRes = await pool.query('SELECT COUNT(*) FROM images WHERE user_id = $1', [userId]);
// // // //     const total = parseInt(countRes.rows[0].count);

// // // //     console.log(`✅ Sync finished. Added: ${addedCount}, Deleted: ${deletedCount}, Total in DB: ${total}`);
    
// // // //     return { 
// // // //         added: addedCount, 
// // // //         deleted: deletedCount, 
// // // //         total: total 
// // // //     };
// // // // };

// // // // // --- Routes ---

// // // // // הצגת תמונה דרך השרת (Proxy) - פותר בעיות CORS והרשאות בתוסף
// // // // router.get("/view/:fileId", async (req, res) => {
// // // //     try {
// // // //         const buffer = await downloadFile(req.params.fileId);
// // // //         res.set("Content-Type", "image/jpeg");
// // // //         res.set("Cache-Control", "public, max-age=3600"); // הוספת Cache לשיפור ביצועים
// // // //         res.send(buffer);
// // // //     } catch (err) {
// // // //         console.error("View Error:", err.message);
// // // //         res.status(500).send("Error serving image");
// // // //     }
// // // // });

// // // // // נתיב הסנכרון הידני מה-App
// // // // router.post("/sync", async (req, res) => {
// // // //     try {
// // // //         // בגרסה הבאה נשלוף את המייל מה-Token של המשתמש
// // // //         const result = await syncDriveLogic('admin@local.com');
// // // //         res.json({ 
// // // //             message: "Sync complete", 
// // // //             ...result 
// // // //         });
// // // //     } catch (err) {
// // // //         console.error("Sync Route Error:", err);
// // // //         res.status(500).json({ error: "Sync failed", details: err.message });
// // // //     }
// // // // });

// // // // export default router;


// // // // שינויים ב 29/01

// // // import express from "express";
// // // import { downloadFile, getDriveClient, listFiles } from "../services/drive.service.js";
// // // import { generateImageEmbedding } from "../services/embeddingService.js";
// // // import pool from "../config/db.js";
// // // import fs from "fs";
// // // import path from "path";

// // // const router = express.Router();

// // // /**
// // //  * לוגיקה לסנכרון כל המשתמשים במערכת
// // //  */
// // // export const syncAllUsersDrive = async () => {
// // //     console.log("🔄 Starting Global Smart Sync for all users...");
    
// // //     try {
// // //         // 1. שליפת כל המשתמשים מה-Database
// // //         const usersRes = await pool.query("SELECT id, email FROM users");
// // //         const users = usersRes.rows;

// // //         for (const user of users) {
// // //             console.log(`📡 Checking Drive for: ${user.email}`);
            
// // //             // 2. טעינת הטוקן של המשתמש מהקובץ שלו
// // //             const tokenPath = path.resolve("tokens", `${user.email}.json`);
// // //             if (!fs.existsSync(tokenPath)) {
// // //                 console.log(`⚠️ No tokens found for ${user.email}, skipping.`);
// // //                 continue;
// // //             }

// // //             const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf-8"));
// // //             const drive = getDriveClient(tokens);

// // //             // 3. סריקת הדרייב של המשתמש
// // //             const driveFiles = await listFiles(drive);

// // //             for (const file of driveFiles) {
// // //                 // בדיקה ב-Supabase אם התמונה כבר קיימת למשתמש הספציפי הזה
// // //                 const checkRes = await pool.query(
// // //                     "SELECT id FROM images WHERE google_file_id = $1 AND user_id = $2",
// // //                     [file.id, user.id]
// // //                 );

// // //                 if (checkRes.rowCount === 0) {
// // //                     try {
// // //                         console.log(`🧠 AI Processing [${user.email}]: ${file.name}`);
// // //                         const buffer = await downloadFile(drive, file.id);
// // //                         const embedding = await generateImageEmbedding(buffer);

// // //                         // שמירה ל-Supabase עם קישור ל-user_id
// // //                         await pool.query(
// // //                             "INSERT INTO images (user_id, google_file_id, name, embedding) VALUES ($1, $2, $3, $4)",
// // //                             [user.id, file.id, file.name, JSON.stringify(embedding)]
// // //                         );
// // //                     } catch (err) {
// // //                         console.error(`❌ Skip file ${file.name}:`, err.message);
// // //                     }
// // //                 }
// // //             }
// // //             // עדכון זמן סנכרון אחרון
// // //             await pool.query("UPDATE users SET last_sync = NOW() WHERE id = $1", [user.id]);
// // //         }
// // //     } catch (err) {
// // //         console.error("❌ Global Sync Error:", err.message);
// // //     }
// // // };

// // // // נתיב צפייה בתמונה (נשאר גנרי כי ה-fileId ייחודי בגוגל)
// // // router.get("/view/:fileId", async (req, res) => {
// // //     // לצורך הפשטות נשתמש בטוקן הראשי או הראשון שקיים
// // //     // במערכת אמיתית נדרש לשלוח כאן את הטוקן של המשתמש המחובר
// // //     try {
// // //         const tokenFiles = fs.readdirSync(path.resolve("tokens"));
// // //         if (tokenFiles.length === 0) throw new Error("No tokens");
// // //         const tokens = JSON.parse(fs.readFileSync(path.resolve("tokens", tokenFiles[0]), "utf-8"));
// // //         const drive = getDriveClient(tokens);
        
// // //         const buffer = await downloadFile(drive, req.params.fileId);
// // //         res.set("Content-Type", "image/jpeg");
// // //         res.send(buffer);
// // //     } catch (err) {
// // //         res.status(500).send("Error serving image");
// // //     }
// // // });

// // // // הפעלת סנכרון ידני מה-API
// // // router.post("/sync", async (req, res) => {
// // //     try {
// // //         await syncAllUsersDrive();
// // //         res.json({ message: "Global sync triggered successfully" });
// // //     } catch (err) {
// // //         res.status(500).json({ error: "Sync failed", details: err.message });
// // //     }
// // // });

// // // export default router;
// // import express from "express";
// // import { downloadFile, getDriveClient, listFiles } from "../services/drive.service.js";
// // import { generateImageEmbedding } from "../services/embeddingService.js";
// // import pool from "../config/db.js";
// // import fs from "fs";
// // import path from "path";

// // const router = express.Router();

// // /**
// //  * לוגיקה לסנכרון כל המשתמשים במערכת
// // //  */
// // // export const syncAllUsersDrive = async () => {
// // //     console.log("🔄 Starting Global Smart Sync for all users...");
    
// // //     try {
// // //         // 1. שליפת כל המשתמשים מה-Database (השתמשנו בטבלה החדשה)
// // //         const usersRes = await pool.query("SELECT email FROM users");
// // //         const users = usersRes.rows;

// // //         for (const user of users) {
// // //             console.log(`📡 Checking Drive for: ${user.email}`);
            
// // //             // 2. טעינת הטוקן של המשתמש מהקובץ שלו
// // //             const tokenPath = path.resolve("tokens", `${user.email}.json`);
// // //             if (!fs.existsSync(tokenPath)) {
// // //                 console.log(`⚠️ No tokens found for ${user.email}, skipping.`);
// // //                 continue;
// // //             }

// // //             const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf-8"));
// // //             const drive = getDriveClient(tokens);

// // //             // 3. סריקת הדרייב של המשתמש
// // //             const driveFiles = await listFiles(drive);

// // //             for (const file of driveFiles) {
// // //                 // בדיקה ב-Supabase אם התמונה כבר קיימת (לפי המבנה החדש)
// // //                 const checkRes = await pool.query(
// // //                     "SELECT id FROM images WHERE google_file_id = $1 AND user_email = $2",
// // //                     [file.id, user.email]
// // //                 );

// // //                 if (checkRes.rowCount === 0) {
// // //                     try {
// // //                         console.log(`🧠 AI Processing [${user.email}]: ${file.name}`);
// // //                         const buffer = await downloadFile(drive, file.id);
// // //                         const embedding = await generateImageEmbedding(buffer);

// // //                         // שמירה ל-Supabase - שים לב: הורדנו את ה-JSON.stringify כי עמודת vector מקבלת מערך ישיר ב-pg
// // //                         await pool.query(
// // //                             "INSERT INTO images (user_email, google_file_id, name, embedding) VALUES ($1, $2, $3, $4)",
// // //                             [user.email, file.id, file.name, embedding]
// // //                         );
// // //                     } catch (err) {
// // //                         console.error(`❌ Skip file ${file.name}:`, err.message);
// // //                     }
// // //                 }
// // //             }
// // //             // עדכון זמן סנכרון אחרון
// // //             await pool.query("UPDATE users SET last_sync = NOW() WHERE email = $1", [user.email]);
// // //         }
// // //     } catch (err) {
// // //         console.error("❌ Global Sync Error:", err.message);
// // //     }
// // // };

// // // החליפי את לוגיקת הלולאה בתוך syncAllUsersDrive:
// // export const syncAllUsersDrive = async () => {
// //     console.log("🔄 Starting Global Smart Sync...");
// //     try {
// //         // שולף את הטוקנים ישירות מהטבלה
// //         const usersRes = await pool.query("SELECT email, access_token, refresh_token, expiry_date FROM users");
        
// //         for (const user of usersRes.rows) {
// //             if (!user.access_token) {
// //                 console.log(`⚠️ No tokens in DB for ${user.email}, skipping.`);
// //                 continue;
// //             }

// //             // יצירת קליינט עם הטוקנים מה-DB
// //             const drive = getDriveClient({
// //                 access_token: user.access_token,
// //                 refresh_token: user.refresh_token,
// //                 expiry_date: parseInt(user.expiry_date)
// //             });

// //             const driveFiles = await listFiles(drive);
// //             for (const file of driveFiles) {
// //                 const checkRes = await pool.query(
// //                     "SELECT id FROM images WHERE google_file_id = $1 AND user_email = $2",
// //                     [file.id, user.email]
// //                 );

// //                 if (checkRes.rowCount === 0) {
// //                     console.log(`🧠 AI Processing: ${file.name}`);
// //                     const buffer = await downloadFile(drive, file.id);
// //                     const embedding = await generateImageEmbedding(buffer);

// //                     // תיקון פורמט הוקטור עבור Supabase
// //                     await pool.query(
// //                         "INSERT INTO images (user_email, google_file_id, name, embedding) VALUES ($1, $2, $3, $4)",
// //                         [user.email, file.id, file.name, JSON.stringify(embedding)]
// //                     );
// //                 }
// //             }
// //             await pool.query("UPDATE users SET last_sync = NOW() WHERE email = $1", [user.email]);
// //         }
// //     } catch (err) {
// //         console.error("❌ Global Sync Error:", err.message);
// //     }
// // };
// // // נתיב צפייה בתמונה
// // router.get("/view/:fileId", async (req, res) => {
// //     try {
// //         const tokenFiles = fs.readdirSync(path.resolve("tokens"));
// //         if (tokenFiles.length === 0) throw new Error("No tokens available");
        
// //         // לוקח את הטוקן הראשון שקיים לצורך התצוגה
// //         const tokens = JSON.parse(fs.readFileSync(path.resolve("tokens", tokenFiles[0]), "utf-8"));
// //         const drive = getDriveClient(tokens);
        
// //         const buffer = await downloadFile(drive, req.params.fileId);
// //         res.set("Content-Type", "image/jpeg");
// //         res.send(buffer);
// //     } catch (err) {
// //         console.error("View error:", err.message);
// //         res.status(500).send("Error serving image");
// //     }
// // });

// // // הפעלת סנכרון ידני מה-API
// // router.post("/sync", async (req, res) => {
// //     try {
// //         await syncAllUsersDrive();
// //         res.json({ message: "Global sync triggered successfully" });
// //     } catch (err) {
// //         res.status(500).json({ error: "Sync failed", details: err.message });
// //     }
// // });

// // export default router;
// import express from "express";
// import { getDriveClient, downloadFile } from "../services/drive.service.js";
// import { generateImageEmbedding } from "../services/embeddingService.js";
// import { supabase } from "../config/supabase.js";

// const router = express.Router();

// // export const syncAllUsersDrive = async () => {
// //     console.log("🔄 Starting Global Sync for all users...");
// //     const { data: users } = await supabase.from('users').select('email');

// //     for (const user of users) {
// //         try {
// //             await syncSingleUser(user.email);
// //         } catch (err) {
// //             console.error(`❌ Failed sync for ${user.email}:`, err.message);
// //         }
// //     }
// // };
// export const syncAllUsersDrive = async () => {
//     console.log("🔄 Starting Global Sync for all users...");
//     const { data: users, error } = await supabase.from('users').select('email');

//     if (error) {
//         console.error("❌ Error fetching users from Supabase:", error.message);
//         return;
//     }

//     if (!users || users.length === 0) {
//         console.log("ℹ️ No users found in database to sync.");
//         return;
//     }

//     for (const user of users) {
//         try {
//             await syncSingleUser(user.email);
//         } catch (err) {
//             console.error(`❌ Failed sync for ${user.email}:`, err.message);
//         }
//     }
// };
// async function syncSingleUser(email) {
//     const drive = await getDriveClient(email);
//     const res = await drive.files.list({
//         pageSize: 100,
//         fields: "files(id, name, thumbnailLink)",
//         q: "mimeType contains 'image/' and trashed = false"
//     });

//     for (const file of res.data.files) {
//         // בדיקה אם התמונה כבר קיימת למשתמש הזה
//         const { data: existing } = await supabase
//             .from('images')
//             .select('id')
//             .eq('id', file.id)
//             .eq('user_email', email)
//             .single();

//         if (!existing) {
//             console.log(`🧠 AI Processing for ${email}: ${file.name}`);
//             const buffer = await downloadFile(drive, file.id);
//             const embedding = await generateImageEmbedding(buffer);

//             await supabase.from('images').insert({
//                 id: file.id,
//                 name: file.name,
//                 user_email: email,
//                 embedding: embedding,
//                 thumbnail_url: file.thumbnailLink
//             });
//         }
//     }
// }

// // נתיב סנכרון ידני (מהכפתור באפליקציה)
// router.post("/sync", async (req, res) => {
//     const { email } = req.body; // המייל מגיע מה-Client
//     if (!email) return res.status(400).json({ error: "Email required" });
//     try {
//         await syncSingleUser(email);
//         res.json({ message: "Sync complete" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // הצגת תמונה (Proxy)
// router.get("/view/:fileId/:email", async (req, res) => {
//     try {
//         const drive = await getDriveClient(req.params.email);
//         const buffer = await downloadFile(drive, req.params.fileId);
//         res.set("Content-Type", "image/jpeg");
//         res.send(buffer);
//     } catch (err) { res.status(500).send("Error"); }
// });

// export default router;
import express from "express";
import { getDriveClient, downloadFile } from "../services/drive.service.js";
// import {  } from "../services/embeddingService.js";
import { generateImageEmbedding } from "../services/embeddingService.js";
import { supabase } from "../config/supabase.js";

const router = express.Router();

/**
 * פונקציה לסנכרון משתמש בודד - עכשיו עם Export כדי ש-Auth יוכל להשתמש בה
 */
export const syncUserImages = async (email) => {
    console.log(`🧠 AI Sync started for: ${email}`);
    const drive = await getDriveClient(email);
    const res = await drive.files.list({
        pageSize: 100,
        fields: "files(id, name, thumbnailLink)",
        q: "mimeType contains 'image/' and trashed = false"
    });

    if (!res.data.files || res.data.files.length === 0) {
        console.log(`ℹ️ No images found in Drive for ${email}`);
        return;
    }

    for (const file of res.data.files) {
        try {
            // בדיקה אם התמונה כבר קיימת למשתמש הזה ב-DB
            const { data: existing } = await supabase
                .from('images')
                .select('id')
                .eq('id', file.id)
                .eq('user_email', email)
                .maybeSingle();

            if (!existing) {
                console.log(`🎨 Processing new image: ${file.name}`);
                const buffer = await downloadFile(drive, file.id);
                const embedding = await generateImageEmbedding(buffer);

                const { error: insertError } = await supabase.from('images').insert({
                    id: file.id,
                    name: file.name,
                    user_email: email,
                    embedding: embedding,
                    thumbnail_url: file.thumbnailLink
                });

                if (insertError) console.error(`❌ DB Insert Error for ${file.name}:`, insertError.message);
                else console.log(`✅ ${file.name} indexed successfully.`);
            }
        } catch (err) {
            console.error(`⚠️ Error processing file ${file.name}:`, err.message);
        }
    }
    console.log(`🏁 Sync complete for ${email}`);
};

/**
 * פונקציה לסנכרון גלובלי של כל המשתמשים
 */
export const syncAllUsersDrive = async () => {
    console.log("🔄 Starting Global Sync for all users...");
    const { data: users, error } = await supabase.from('users').select('email');

    if (error) {
        console.error("❌ Error fetching users from Supabase:", error.message);
        return;
    }

    if (!users || users.length === 0) {
        console.log("ℹ️ No users found in database to sync.");
        return;
    }

    for (const user of users) {
        try {
            // קריאה לפונקציית הסנכרון של משתמש בודד
            await syncUserImages(user.email);
        } catch (err) {
            console.error(`❌ Failed sync for ${user.email}:`, err.message);
        }
    }
};

// --- Routes ---

// נתיב סנכרון ידני (מהכפתור באפליקציה)
router.post("/sync", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });
    try {
        await syncUserImages(email);
        res.json({ message: "Sync complete" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// הצגת תמונה (Proxy)
router.get("/view/:fileId/:email", async (req, res) => {
    try {
        const drive = await getDriveClient(req.params.email);
        const buffer = await downloadFile(drive, req.params.fileId);
        res.set("Content-Type", "image/jpeg");
        res.send(buffer);
    } catch (err) { 
        console.error("View Error:", err.message);
        res.status(500).send("Error fetching image"); 
    }
});

export default router;