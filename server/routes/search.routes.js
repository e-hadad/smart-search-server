
import express from "express";
import { supabase } from "../config/supabase.js";
import { generateTextEmbedding } from "../services/embeddingService.js";
import translate from "google-translate-api-x"; // ייבוא ספריית התרגום

const router = express.Router();

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