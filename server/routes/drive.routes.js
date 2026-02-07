
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