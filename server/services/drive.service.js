// // // // // // // // // import { google } from "googleapis";
// // // // // // // // // import oauth2Client from "../config/googleAuth.js";
// // // // // // // // // console.log("Current credentials:", oauth2Client.credentials);
// // // // // // // // // import { getTokens } from "./storage/tokenStorage.js";

// // // // // // // // // export const listFiles = async () => {
// // // // // // // // //   const tokens = getTokens();
// // // // // // // // //   if (!tokens) throw new Error("No tokens found, please authenticate first");

// // // // // // // // //   oauth2Client.setCredentials(tokens);
// // // // // // // // //   const drive = google.drive({ version: "v3", auth: oauth2Client });

// // // // // // // // //   const res = await drive.files.list({
// // // // // // // // //     pageSize: 20,
// // // // // // // // //     fields: "files(id, name, mimeType, modifiedTime)",
// // // // // // // // //   });

// // // // // // // // //   return res.data.files;
// // // // // // // // // };

// // // // // // // // import fs from "fs";
// // // // // // // // import path from "path";
// // // // // // // // import { google } from "googleapis";
// // // // // // // // import oauth2Client from "../config/googleAuth.js";

// // // // // // // // const TOKEN_PATH = path.join("tokens.json");
// // // // // // // // const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
// // // // // // // // const images = res.data.files.filter(file => imageMimeTypes.includes(file.mimeType));

// // // // // // // // export const listFiles = async () => {
// // // // // // // //   try {
// // // // // // // //     // טען tokens אם קיימים
// // // // // // // //     if (fs.existsSync(TOKEN_PATH)) {
// // // // // // // //       const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
// // // // // // // //       oauth2Client.setCredentials(tokens);
// // // // // // // //     } else {
// // // // // // // //       throw new Error("No tokens found, please authenticate first");
// // // // // // // //     }

// // // // // // // //     const drive = google.drive({ version: "v3", auth: oauth2Client });

// // // // // // // //     const res = await drive.files.list({
// // // // // // // //       pageSize: 10,
// // // // // // // //       fields: "files(id, name, mimeType)",
// // // // // // // //     });

// // // // // // // //     return res.data.files;
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error("Drive fetch error:", err);
// // // // // // // //     throw err;
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // export const searchFiles = async (query) => {
// // // // // // // //   const files = await listFiles(); // reuse את הפונקציה הקיימת
// // // // // // // //   return files.filter(file => file.name.toLowerCase().includes(query.toLowerCase()));
// // // // // // // // };

// // // // // // // import fs from "fs";
// // // // // // // import path from "path";
// // // // // // // import { google } from "googleapis";
// // // // // // // import oauth2Client from "../config/googleAuth.js";

// // // // // // // const TOKEN_PATH = path.join("tokens.json");
// // // // // // // const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

// // // // // // // export const listFiles = async () => {
// // // // // // //   try {
// // // // // // //     // טען tokens אם קיימים
// // // // // // //     if (fs.existsSync(TOKEN_PATH)) {
// // // // // // //       const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
// // // // // // //       oauth2Client.setCredentials(tokens);
// // // // // // //     } else {
// // // // // // //       throw new Error("No tokens found, please authenticate first");
// // // // // // //     }

// // // // // // //     const drive = google.drive({ version: "v3", auth: oauth2Client });

// // // // // // //     const response = await drive.files.list({
// // // // // // //       pageSize: 100,
// // // // // // //       fields: "files(id, name, mimeType)",
// // // // // // //     });

// // // // // // //     // סינון רק תמונות
// // // // // // //     const images = response.data.files.filter(file =>
// // // // // // //       imageMimeTypes.includes(file.mimeType)
// // // // // // //     );

// // // // // // //     return images; // מחזיר רק את התמונות
// // // // // // //   } catch (err) {
// // // // // // //     console.error("Drive fetch error:", err);
// // // // // // //     throw err;
// // // // // // //   }
// // // // // // // };

// // // // // // // // פונקציה לחיפוש לפי שם בתוך התמונות
// // // // // // // export const searchFiles = async (query) => {
// // // // // // //   const files = await listFiles(); // reuse את הפונקציה הקיימת
// // // // // // //   return files.filter(file => file.name.toLowerCase().includes(query.toLowerCase()));
// // // // // // // };

// // // // // // import fs from "fs";
// // // // // // import path from "path";
// // // // // // import { google } from "googleapis";
// // // // // // import oauth2Client from "../config/googleAuth.js";

// // // // // // const TOKEN_PATH = path.join("tokens.json");
// // // // // // const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

// // // // // // export const listFiles = async () => {
// // // // // //   try {
// // // // // //     // טען tokens אם קיימים
// // // // // //     if (fs.existsSync(TOKEN_PATH)) {
// // // // // //       const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
// // // // // //       oauth2Client.setCredentials(tokens);
// // // // // //     } else {
// // // // // //       throw new Error("No tokens found, please authenticate first");
// // // // // //     }

// // // // // //     const drive = google.drive({ version: "v3", auth: oauth2Client });

// // // // // //     const res = await drive.files.list({
// // // // // //       pageSize: 100,
// // // // // //       fields: "files(id, name, mimeType)",
// // // // // //     });

// // // // // //     // סינון רק קבצי תמונה
// // // // // //     const images = res.data.files.filter(file =>
// // // // // //       imageMimeTypes.includes(file.mimeType)
// // // // // //     );

// // // // // //     return images;
// // // // // //   } catch (err) {
// // // // // //     console.error("Drive fetch error:", err);
// // // // // //     throw err;
// // // // // //   }
// // // // // // };

// // // // // // // חיפוש פשוט לפי שם
// // // // // // export const searchFiles = async (query) => {
// // // // // //   const files = await listFiles();
// // // // // //   return files.filter(file =>
// // // // // //     file.name.toLowerCase().includes(query.toLowerCase())
// // // // // //   );
// // // // // // };

// // // // // // הוספה ל- server\services\drive.service.js

// // // // // export const downloadFile = async (fileId) => {
// // // // //   try {
// // // // //     // טעינת טוקנים (מוודא שאנחנו מחוברים)
// // // // //     if (fs.existsSync(TOKEN_PATH)) {
// // // // //       const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
// // // // //       oauth2Client.setCredentials(tokens);
// // // // //     }

// // // // //     const drive = google.drive({ version: "v3", auth: oauth2Client });
    
// // // // //     const response = await drive.files.get(
// // // // //       { fileId: fileId, alt: "media" },
// // // // //       { responseType: "arraybuffer" }
// // // // //     );

// // // // //     return Buffer.from(response.data);
// // // // //   } catch (err) {
// // // // //     console.error(`Error downloading file ${fileId}:`, err);
// // // // //     throw err;
// // // // //   }
// // // // // };
// // // // import { google } from "googleapis";
// // // // import fs from "fs";
// // // // import path from "path";
// // // // import oauth2Client from "../config/googleAuth.js";

// // // // const TOKEN_PATH = path.resolve("tokens.json");

// // // // function getDriveClient() {
// // // //     if (fs.existsSync(TOKEN_PATH)) {
// // // //         const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
// // // //         oauth2Client.setCredentials(tokens);
// // // //     }
// // // //     return google.drive({ version: "v3", auth: oauth2Client });
// // // // }

// // // // export const listFiles = async () => {
// // // //     const drive = getDriveClient();
// // // //     const res = await drive.files.list({
// // // //         pageSize: 100,
// // // //         fields: "files(id, name, mimeType)",
// // // //         q: "mimeType contains 'image/'", // מביא רק תמונות
// // // //     });
// // // //     return res.data.files;
// // // // };

// // // // export const downloadFile = async (fileId) => {
// // // //     const drive = getDriveClient();
// // // //     const response = await drive.files.get(
// // // //         { fileId: fileId, alt: "media" },
// // // //         { responseType: "arraybuffer" }
// // // //     );
// // // //     return Buffer.from(response.data);
// // // // };
// // // import { google } from "googleapis";
// // // import fs from "fs";
// // // import path from "path";
// // // import oauth2Client from "../config/googleAuth.js";

// // // const TOKEN_PATH = path.resolve("tokens.json");

// // // async function getDriveClient() {
// // //     if (!fs.existsSync(TOKEN_PATH)) {
// // //         throw new Error("Tokens file not found. Please authenticate first.");
// // //     }
    
// // //     const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
// // //     oauth2Client.setCredentials(tokens);

// // //     // בדיקה אם הטוקן פג תוקף ורענונו במידת הצורך
// // //     oauth2Client.once('tokens', (newTokens) => {
// // //         const currentTokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
// // //         fs.writeFileSync(TOKEN_PATH, JSON.stringify({ ...currentTokens, ...newTokens }, null, 2));
// // //     });

// // //     return google.drive({ version: "v3", auth: oauth2Client });
// // // }

// // // export const listFiles = async () => {
// // //     const drive = await getDriveClient();
// // //     let allFiles = [];
// // //     let pageToken = null;

// // //     console.log("📡 שואב רשימת קבצים מלאה מגוגל דרייב (זה עשוי לקחת רגע)...");

// // //     try {
// // //         do {
// // //             const res = await drive.files.list({
// // //                 pageSize: 100, // קופסאות של 100 בכל פעם
// // //                 fields: "nextPageToken, files(id, name, mimeType)",
// // //                 q: "mimeType contains 'image/' and trashed = false",
// // //                 pageToken: pageToken // המפתח לדף הבא
// // //             });

// // //             allFiles.push(...res.data.files);
// // //             pageToken = res.data.nextPageToken; // גוגל נותנת לנו מפתח לדף הבא אם יש כזה
            
// // //             console.log(`📦 נאספו ${allFiles.length} תמונות עד כה...`);
            
// // //         } while (pageToken); // תמשיך כל עוד יש עוד דפים

// // //         console.log(`✅ סיום: נמצאו ${allFiles.length} תמונות סה"כ בדרייב.`);
// // //         return allFiles;
// // //     } catch (error) {
// // //         console.error("❌ שגיאה במשיכת רשימת קבצים:", error);
// // //         throw error;
// // //     }
// // // };

// // // export const downloadFile = async (fileId) => {
// // //     const drive = await getDriveClient();
// // //     try {
// // //         const response = await drive.files.get(
// // //             { fileId: fileId, alt: "media" },
// // //             { responseType: "arraybuffer" } // מבטיח קבלת נתונים גולמיים של התמונה
// // //         );
        
// // //         // המרה של ה-ArrayBuffer ל-Buffer של Node.js
// // //         return Buffer.from(response.data);
// // //     } catch (err) {
// // //         console.error(`❌ Drive Download Error [ID: ${fileId}]:`, err.message);
// // //         throw err;
// // //     }
// // // };
// // import { google } from "googleapis";
// // import fs from "fs";
// // import path from "path";
// // import oauth2Client from "../config/googleAuth.js";

// // const TOKEN_PATH = path.resolve("tokens.json");

// // // פונקציה פנימית להשגת ה-Client
// // async function getDriveClientInstance() {
// //     if (!fs.existsSync(TOKEN_PATH)) {
// //         throw new Error("Tokens file not found. Please authenticate first.");
// //     }
// //     const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
// //     oauth2Client.setCredentials(tokens);
// //     return google.drive({ version: "v3", auth: oauth2Client });
// // }

// // // ייצוא הפונקציה לשימוש ב-Routes
// // export const getDriveClient = getDriveClientInstance;

// // // export const listFiles = async () => {
// // //     const drive = await getDriveClientInstance();
// // //     let allFiles = [];
// // //     let pageToken = null;
// // //     try {
// // //         do {
// // //             const res = await drive.files.list({
// // //                 pageSize: 100,
// // //                 fields: "nextPageToken, files(id, name, mimeType)",
// // //                 q: "mimeType contains 'image/' and trashed = false",
// // //                 pageToken: pageToken
// // //             });
// // //             allFiles.push(...res.data.files);
// // //             pageToken = res.data.nextPageToken;
// // //         } while (pageToken);
// // //         return allFiles;
// // //     } catch (error) {
// // //         console.error("❌ Error listing files:", error);
// // //         throw error;
// // //     }
// // // };
// // export const listFiles = async () => {
// //     const drive = await getDriveClientInstance();
// //     let allFiles = [];
// //     let pageToken = null;
// //     try {
// //         do {
// //             const res = await drive.files.list({
// //                 pageSize: 100,
// //                 // הוספנו כאן את thumbnailLink
// //                 fields: "nextPageToken, files(id, name, mimeType, thumbnailLink)", 
// //                 q: "mimeType contains 'image/' and trashed = false",
// //                 pageToken: pageToken
// //             });
// //             allFiles.push(...res.data.files);
// //             pageToken = res.data.nextPageToken;
// //         } while (pageToken);
// //         return allFiles;
// //     } catch (error) {
// //         console.error("❌ Error listing files:", error);
// //         throw error;
// //     }
// // };

// // export const downloadFile = async (fileId) => {
// //     const drive = await getDriveClientInstance();
// //     try {
// //         const response = await drive.files.get(
// //             { fileId: fileId, alt: "media" },
// //             { responseType: "arraybuffer" }
// //         );
// //         return Buffer.from(response.data);
// //     } catch (err) {
// //         console.error(`❌ Drive Download Error [ID: ${fileId}]:`, err.message);
// //         throw err;
// //     }
// // };
// // שינויים ב 29/01
// import { google } from "googleapis";
// import oauth2Client from "../config/googleAuth.js";

// /**
//  * יוצר מופע של Drive Client עבור משתמש ספציפי
//  * @param {Object} tokens - הטוקנים של המשתמש מגוגל
//  */
// export const getDriveClient = (tokens) => {
//     oauth2Client.setCredentials(tokens);
//     return google.drive({ version: "v3", auth: oauth2Client });
// };

// /**
//  * מחזיר רשימת קבצים עבור ה-Drive Client שסופק
//  */
// export const listFiles = async (drive) => {
//     let allFiles = [];
//     let pageToken = null;
//     try {
//         do {
//             const res = await drive.files.list({
//                 pageSize: 100,
//                 fields: "nextPageToken, files(id, name, mimeType, thumbnailLink)",
//                 q: "mimeType contains 'image/' and trashed = false",
//                 pageToken: pageToken
//             });
//             allFiles.push(...(res.data.files || []));
//             pageToken = res.data.nextPageToken;
//         } while (pageToken);
//         return allFiles;
//     } catch (error) {
//         console.error("❌ Error listing files:", error.message);
//         throw error;
//     }
// };

// /**
//  * מוריד קובץ ספציפי כ-Buffer
//  */
// export const downloadFile = async (drive, fileId) => {
//     try {
//         const response = await drive.files.get(
//             { fileId: fileId, alt: "media" },
//             { responseType: "arraybuffer" }
//         );
//         return Buffer.from(response.data);
//     } catch (err) {
//         console.error(`❌ Drive Download Error [ID: ${fileId}]:`, err.message);
//         throw err;
//     }
// };
import { google } from "googleapis";
import oauth2Client from "../config/googleAuth.js";
import { supabase } from "../config/supabase.js";

// יצירת קליינט גוגל עבור משתמש ספציפי מה-DB
export const getDriveClient = async (userEmail) => {
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', userEmail)
        .single();

    if (error || !user) throw new Error("User not found in DB");

    oauth2Client.setCredentials({
        access_token: user.access_token,
        refresh_token: user.refresh_token,
    });
    
    return google.drive({ version: "v3", auth: oauth2Client });
};

// הורדת קובץ לצורך עיבוד וקטורי
export const downloadFile = async (drive, fileId) => {
    const response = await drive.files.get(
        { fileId: fileId, alt: "media" },
        { responseType: "arraybuffer" }
    );
    return Buffer.from(response.data);
};