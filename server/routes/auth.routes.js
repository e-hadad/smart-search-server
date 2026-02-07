
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