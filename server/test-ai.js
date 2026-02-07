import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const HF_TOKEN = process.env.HF_TOKEN;
const MODEL_ID = "sentence-transformers/clip-ViT-B-32";

async function testAI() {
    console.log("🚀 בדיקת חיבור ל-Hugging Face...");
    console.log(`📡 מודל: ${MODEL_ID}`);
    
    try {
        const response = await fetch(
    `https://api-inference.huggingface.co/models/${MODEL_ID}`,
    {
        headers: { 
            "Authorization": `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json",
            "Accept": "application/json" // זה אומר לנטפרי/HF: "תנו לי רק קוד, לא אתר!"
        },
        method: "POST",
        body: JSON.stringify({ 
            inputs: "test",
            options: { wait_for_model: true } // גורם לשרת לחכות עד שהמודל יטען
        }),
    }
);

        const text = await response.text();

        if (text.includes("<!doctype") || text.includes("<html")) {
            console.error("❌ חסימת נטפרי זוהתה!");
            console.log("נטפרי החזיר דף HTML במקום תשובה מה-AI.");
            console.log("--- תחילת תשובת ה-HTML ---");
            console.log(text.substring(0, 500)); // מציג רק את ההתחלה של הדף
            console.log("--- סוף תשובת ה-HTML ---");
        } else {
            const json = JSON.parse(text);
            console.log("✅ ה-AI עובד!!! קיבלנו וקטור:");
            console.log(json);
        }
    } catch (err) {
        console.error("❌ שגיאה טכנית:", err.message);
    }
}

testAI();