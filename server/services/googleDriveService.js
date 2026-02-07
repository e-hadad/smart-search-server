import { google } from 'googleapis';
import { supabase } from '../config/supabase.js';
import { generateImageEmbedding } from './embeddingService.js';
import path from 'path';

// הגדרת החיבור לגוגל - השתמשי בפרטים מה-Console של גוגל
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// פונקציה שמייצרת Client מוכן לעבודה (דורשת Refresh Token ב-.env)
export const getDriveClient = async (userEmail) => {
    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN 
    });
    return google.drive({ version: 'v3', auth: oauth2Client });
};

export const syncUserImages = async (userEmail) => {
    try {
        const drive = await getDriveClient(userEmail);
        
        // 1. קבלת רשימת קבצים (רק תמונות)
        const response = await drive.files.list({
            q: "mimeType contains 'image/'",
            fields: "files(id, name, thumbnailLink)",
            pageSize: 50 
        });

        const files = response.data.files;
        console.log(`📂 Found ${files.length} images to analyze.`);

        for (const file of files) {
            try {
                // בדיקה אם הקובץ כבר נותח בעבר (אופציונלי - לחיסכון בזמן)
                const { data: existing } = await supabase
                    .from('images')
                    .select('id')
                    .eq('id', file.id)
                    .single();

                if (existing) {
                    console.log(`⏩ Skipping ${file.name}, already analyzed.`);
                    continue;
                }

                console.log(`🧠 AI Deep Analysis: ${file.name}...`);

                // 2. הורדת הקובץ הבינארי מגוגל
                const imageRes = await drive.files.get(
                    { fileId: file.id, alt: 'media' },
                    { responseType: 'arraybuffer' }
                );
                
                const buffer = Buffer.from(imageRes.data);

                // 3. יצירת ה-Embedding מהתוכן הוויזואלי (הפיקסלים)
                const vector = await generateImageEmbedding(buffer); 

                // 4. שמירה ל-Supabase
                const { error: upsertError } = await supabase
                    .from('images')
                    .upsert({
                        id: file.id,
                        user_email: userEmail,
                        name: file.name,
                        embedding: vector,
                        thumbnail_url: file.thumbnailLink,
                        updated_at: new Date()
                    });

                if (upsertError) throw upsertError;
                console.log(`✅ Success: ${file.name} is now searchable by content.`);

            } catch (err) {
                console.error(`⚠️ Error processing ${file.name}:`, err.message);
            }
        }
        console.log("🏁 Global Sync Finished!");
    } catch (err) {
        console.error("❌ Critical Sync Error:", err.message);
    }
};