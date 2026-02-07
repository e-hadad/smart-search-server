// // // // // // // import express from "express";
// // // // // // // import oauth2Client from "../config/googleAuth.js";
// // // // // // // import { saveTokens } from "../services/storage/tokenStorage.js";

// // // // // // // const router = express.Router();
// // // // // // // const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

// // // // // // // router.get("/google", (req, res) => {
// // // // // // //   const url = oauth2Client.generateAuthUrl({
// // // // // // //     access_type: "offline",
// // // // // // //     scope: SCOPES,
// // // // // // //     prompt: "consent", // מבטיח לקבל refresh_token בכל פעם
// // // // // // //   });
// // // // // // //   res.redirect(url);
// // // // // // // });

// // // // // // // router.get("/google/callback", async (req, res) => {
// // // // // // //   const { code } = req.query;
// // // // // // //   try {
// // // // // // //     const { tokens } = await oauth2Client.getToken(code);
// // // // // // //     oauth2Client.setCredentials(tokens);

// // // // // // //     // שמירה של Tokens
// // // // // // //     saveTokens(tokens);

// // // // // // //     res.send("Google authentication successful ✅ Tokens saved");
// // // // // // //   } catch (err) {
// // // // // // //     console.error(err);
// // // // // // //     res.status(500).send("Error authenticating with Google");
// // // // // // //   }
// // // // // // // });

// // // // // // // export default router;

// // // // // // // auth.routes.js
// // // // // // import express from "express";
// // // // // // import fs from "fs";
// // // // // // import path from "path";
// // // // // // import oauth2Client from "../config/googleAuth.js";

// // // // // // const router = express.Router();
// // // // // // const TOKEN_PATH = path.join("tokens.json");

// // // // // // router.get("/google/callback", async (req, res) => {
// // // // // //   const { code } = req.query;

// // // // // //   try {
// // // // // //     const { tokens } = await oauth2Client.getToken(code);
// // // // // //     oauth2Client.setCredentials(tokens);

// // // // // //     // שמירה של Tokens
// // // // // //     fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));

// // // // // //     res.send("Google authentication successful ✅ Tokens saved");
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     res.status(500).send("Error authenticating with Google");
// // // // // //   }
// // // // // // });

// // // // // // export default router;

// // // // // import express from "express";
// // // // // import oauth2Client from "../config/googleAuth.js";

// // // // // const router = express.Router();
// // // // // const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

// // // // // router.get("/google", (req, res) => {
// // // // //   const url = oauth2Client.generateAuthUrl({
// // // // //     access_type: "offline",
// // // // //     scope: SCOPES,
// // // // //     prompt: "consent",
// // // // //   });
// // // // //   res.redirect(url);
// // // // // });

// // // // // export default router;
// // // // import express from "express";
// // // // import fs from "fs";
// // // // import path from "path";
// // // // import oauth2Client from "../config/googleAuth.js";

// // // // const router = express.Router();
// // // // const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];
// // // // const TOKEN_PATH = path.join("tokens.json");

// // // // // שלב 1: הפניה לאותנטיקציה של Google
// // // // router.get("/google", (req, res) => {
// // // //   const url = oauth2Client.generateAuthUrl({
// // // //     access_type: "offline",
// // // //     scope: SCOPES,
// // // //     prompt: "consent",
// // // //   });
// // // //   res.redirect(url);
// // // // });

// // // // // שלב 2: Callback אחרי ההתחברות
// // // // router.get("/google/callback", async (req, res) => {
// // // //   const { code } = req.query;

// // // //   if (!code) {
// // // //     return res.status(400).send("No code received from Google");
// // // //   }

// // // //   try {
// // // //     const { tokens } = await oauth2Client.getToken(code);
// // // //     oauth2Client.setCredentials(tokens);

// // // //     // שמירה לקובץ tokens.json
// // // //     fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));

// // // //     // אפשר לעשות redirect לדף קטן במקום רק res.send
// // // //     res.send("Google authentication successful ✅ Tokens saved");
// // // //   } catch (err) {
// // // //     console.error("Error retrieving tokens:", err);
// // // //     res.status(500).send("Error authenticating with Google");
// // // //   }
// // // // });

// // // // export default router;

// // // import express from "express";
// // // import fs from "fs";
// // // import path from "path";
// // // import oauth2Client from "../config/googleAuth.js";

// // // const router = express.Router();

// // // const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];
// // // const TOKEN_PATH = path.join("tokens.json");

// // // // שלב 1: הפניה להתחברות עם Google
// // // router.get("/google", (req, res) => {
// // //   const url = oauth2Client.generateAuthUrl({
// // //     access_type: "offline",
// // //     scope: SCOPES,
// // //     prompt: "consent",
// // //   });

// // //   res.redirect(url);
// // // });

// // // // שלב 2: callback אחרי ההתחברות
// // // router.get("/google/callback", async (req, res) => {
// // //   const { code } = req.query;

// // //   if (!code) {
// // //     return res.status(400).send("No code received");
// // //   }

// // //   try {
// // //     const { tokens } = await oauth2Client.getToken(code);
// // //     oauth2Client.setCredentials(tokens);

// // //     fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));

// // //     res.send("Google authentication successful ✅");
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).send("Auth failed");
// // //   }
// // // });

// // // export default router;

// // // שינויים ב 29/01
// // import express from "express";
// // import fs from "fs";
// // import path from "path";
// // import oauth2Client from "../config/googleAuth.js";
// // import pool from "../config/db.js";

// // const router = express.Router();
// // const SCOPES = ["https://www.googleapis.com/auth/drive.readonly", "openid", "email", "profile"];
// // const TOKENS_DIR = path.join("tokens");

// // // יצירת תיקיית טוקנים אם לא קיימת
// // if (!fs.existsSync(TOKENS_DIR)) fs.mkdirSync(TOKENS_DIR);

// // // שלב 1: הפניה להתחברות
// // router.get("/google", (req, res) => {
// //     const url = oauth2Client.generateAuthUrl({
// //         access_type: "offline",
// //         scope: SCOPES,
// //         prompt: "consent",
// //     });
// //     res.redirect(url);
// // });

// // // // שלב 2: Callback - חזרה מגוגל
// // // router.get("/google/callback", async (req, res) => {
// // //     const { code } = req.query;
// // //     if (!code) return res.status(400).send("No code received");

// // //     try {
// // //         const { tokens } = await oauth2Client.getToken(code);
// // //         oauth2Client.setCredentials(tokens);

// // //         // שליפת פרטי המשתמש (אימייל)
// // //         const userInfo = await oauth2Client.request({ url: "https://www.googleapis.com/oauth2/v3/userinfo" });
// // //         const email = userInfo.data.email;

// // //         // 1. שמירה/עדכון המשתמש ב-Supabase
// // //         const userRes = await pool.query(
// // //             "INSERT INTO users (email, last_sync) VALUES ($1, NOW()) ON CONFLICT (email) DO UPDATE SET last_sync = NOW() RETURNING id",
// // //             [email]
// // //         );
// // //         const userId = userRes.rows[0].id;

// // //         // 2. שמירת הטוקן בקובץ ייחודי לפי אימייל
// // //         fs.writeFileSync(path.join(TOKENS_DIR, `${email}.json`), JSON.stringify(tokens, null, 2));

// // //         res.send(`<h1>התחברת בהצלחה! ✅</h1><p>האימייל שלך: ${email}</p><p>אפשר לסגור את החלון ולחזור לתוסף.</p>`);
// // //     } catch (err) {
// // //         console.error("Auth Error:", err);
// // //         res.status(500).send("Authentication failed");
// // //     }
// // // });

// // // החליפי את כל ה-router.get("/google/callback" בזה:
// // router.get("/google/callback", async (req, res) => {
// //     const { code } = req.query;
// //     if (!code) return res.status(400).send("No code received");

// //     try {
// //         const { tokens } = await oauth2Client.getToken(code);
        
// //         // שליפת פרטי המשתמש
// //         oauth2Client.setCredentials(tokens);
// //         const userInfo = await oauth2Client.request({ url: "https://www.googleapis.com/oauth2/v3/userinfo" });
// //         const email = userInfo.data.email;

// //         // שמירה ל-Supabase - כאן השינוי הקריטי!
// //         await pool.query(
// //             `INSERT INTO users (email, access_token, refresh_token, expiry_date, last_sync) 
// //              VALUES ($1, $2, $3, $4, NOW()) 
// //              ON CONFLICT (email) 
// //              DO UPDATE SET 
// //                 access_token = $2, 
// //                 refresh_token = $3, 
// //                 expiry_date = $4, 
// //                 last_sync = NOW()`,
// //             [email, tokens.access_token, tokens.refresh_token, tokens.expiry_date]
// //         );

// //         // שומרים גם בקובץ לגיבוי כמו שעשית
// //         fs.writeFileSync(path.join(TOKENS_DIR, `${email}.json`), JSON.stringify(tokens, null, 2));

// //         res.send(`<h1>התחברת בהצלחה! ✅</h1><p>האימייל: ${email}</p><p>אפשר לסגור את החלון.</p>`);
// //     } catch (err) {
// //         console.error("Auth Error:", err);
// //         res.status(500).send("Authentication failed");
// //     }
// // });

// // export default router;
// import express from "express";
// import oauth2Client from "../config/googleAuth.js";
// import { supabase } from "../config/supabase.js"; // שימוש ב-Client המאוחד

// const router = express.Router();
// const SCOPES = ["https://www.googleapis.com/auth/drive.readonly", "openid", "email", "profile"];

// router.get("/google", (req, res) => {
//     const url = oauth2Client.generateAuthUrl({
//         access_type: "offline",
//         scope: SCOPES,
//         prompt: "consent",
//     });
//     res.redirect(url);
// });

// router.get("/google/callback", async (req, res) => {
//     const { code } = req.query;
//     if (!code) return res.status(400).send("No code received");

//     try {
//         const { tokens } = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(tokens);
        
//         const userInfo = await oauth2Client.request({ url: "https://www.googleapis.com/oauth2/v3/userinfo" });
//         const email = userInfo.data.email;

//         // שמירה ל-Supabase בצורה מאובטחת
//         const { error } = await supabase
//             .from('users')
//             .upsert({
//                 email: email,
//                 access_token: tokens.access_token,
//                 refresh_token: tokens.refresh_token,
//                 expiry_date: tokens.expiry_date,
//                 last_sync: new Date()
//             });

//         if (error) throw error;

//         // הודעה ל-Frontend לסגירת החלון ועדכון המייל
//         res.send(`
//             <script>
//                 window.opener.postMessage({ type: 'AUTH_SUCCESS', email: '${email}' }, '*');
//                 window.close();
//             </script>
//             <h1>התחברת בהצלחה! מחבר אותך לאפליקציה...</h1>
//         `);
//     } catch (err) {
//         console.error("Auth Error:", err);
//         res.status(500).send("Authentication failed");
//     }
// });

// export default router;
import express from "express";
import oauth2Client from "../config/googleAuth.js";
import { supabase } from "../config/supabase.js";
// ייבוא פונקציית הסנכרון כדי להפעיל אותה מיד לאחר ה-Login
import { syncUserImages } from "./drive.routes.js"; 

const router = express.Router();
// const SCOPES = ["https://www.googleapis.com/auth/drive.readonly", "openid", "email", "profile"];
const SCOPES = [
  "https://www.googleapis.com/auth/drive.readonly", // קריאת רשימת קבצים
  "https://www.googleapis.com/auth/drive.metadata.readonly", // קריאת מטא-דאטה (תמונות ממוזערות)
  "openid", 
  "email", 
  "profile"
];
// 1. ניתוב להוצאת המשתמש להתחברות בגוגל
router.get("/google", (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent", // מבטיח שנקבל Refresh Token בכל התחברות מחדש
    });
    res.redirect(url);
});

// 2. ה-Callback שגוגל חוזר אליו
router.get("/google/callback", async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).send("No code received");

    try {
        // קבלת הטוקנים מגוגל
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        
        // קבלת פרטי המשתמש (מייל)
        const userInfo = await oauth2Client.request({ url: "https://www.googleapis.com/oauth2/v3/userinfo" });
        const email = userInfo.data.email;

        console.log(`🔐 User authenticated: ${email}`);

        // שמירה/עדכון המשתמש והטוקנים ב-Supabase
        const { error } = await supabase
            .from('users')
            .upsert({
                email: email,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token, // חשוב מאוד לסנכרון עתידי
                expiry_date: tokens.expiry_date,
                last_sync: new Date()
            });

        if (error) throw error;

        // --- הוספת הסנכרון המיידי ---
        console.log(`🚀 Triggering immediate sync for ${email}...`);
        
        // מפעילים את הסנכרון ברקע (בלי await כדי לא לתקוע את המשתמש)
        syncUserImages(email).catch(err => {
            console.error(`❌ Background sync failed for ${email}:`, err.message);
        });

        // החזרת סקריפט ל-Frontend שסוגר את החלון ומעדכן את האפליקציה
        res.send(`
            <html>
                <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                    <h1>התחברת בהצלחה! ✅</h1>
                    <p>אנחנו מתחילים לסרוק את הדרייב שלך. החלון ייסגר מיד...</p>
                    <script>
                        if (window.opener) {
                            window.opener.postMessage({ type: 'AUTH_SUCCESS', email: '${email}' }, '*');
                        }
                        setTimeout(() => window.close(), 1000);
                    </script>
                </body>
            </html>
        `);
    } catch (err) {
        console.error("❌ Auth Error:", err);
        res.status(500).send("Authentication failed");
    }
});

export default router;