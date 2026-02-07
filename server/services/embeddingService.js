
// import { AutoProcessor, CLIPVisionModelWithProjection, CLIPTextModelWithProjection, AutoTokenizer, RawImage, env } from "@huggingface/transformers";
// import path from 'path';

// // --- הגדרות עבודה מקומית בלבד ---
// env.allowRemoteModels = false; // חוסם פנייה לאינטרנט
// // מגדיר את תיקיית השרת כבסיס לחיפוש מודלים
// env.localModelPath = path.join(process.cwd()); 

// let processor = null;
// let visionModel = null;
// let textModel = null;
// let tokenizer = null;

// /**
//  * פונקציה לאתחול המודלים מהתיקייה המקומית
//  */
// async function initModels() {
//     // הנתיב היחסי מה-server לתיקיית המודל
//     const modelId = "embeddings/clip-vit-base-patch32";
    
//     if (!processor) {
//         console.log(`🔹 Loading LOCAL CLIP components from: ${modelId}...`);
//         try {
//             // טעינת רכיבי העיבוד (טוקנייזר ופרוססור)
//             tokenizer = await AutoTokenizer.from_pretrained(modelId);
//             processor = await AutoProcessor.from_pretrained(modelId);
            
//             // טעינת המודלים (ראייה וטקסט)
//             // הערה: אם הקבצים שלך הם בפורמט quantized (קטנים), הוסיפי { quantized: true } בסוגריים
//             visionModel = await CLIPVisionModelWithProjection.from_pretrained(modelId);
//             textModel = await CLIPTextModelWithProjection.from_pretrained(modelId);
            
//             console.log("✅ Successfully loaded CLIP from local embeddings folder!");
//         } catch (err) {
//             console.error("❌ Local load error. Please verify folder structure.");
//             console.error("Details:", err.message);
//             throw err;
//         }
//     }
// }

// /**
//  * יצירת Embedding לתמונה מתוך Buffer
//  */
// export async function generateImageEmbedding(buffer) {
//     try {
//         await initModels();
        
//         // המרת ה-Buffer לאובייקט תמונה שהמודל מבין
//         const blob = new Blob([buffer]);
//         const image = await RawImage.fromBlob(blob);
        
//         // עיבוד מקדים של התמונה
//         const imageInputs = await processor(image);
        
//         // הרצת המודל - שימוש ב-forward לקבלת הוקטור
//         const { image_embeds } = await visionModel.forward(imageInputs);
        
//         console.log("✅ Image vector generated locally.");
//         return Array.from(image_embeds.data);
//     } catch (error) {
//         console.error("❌ Image embedding error:", error.message);
//         throw error;
//     }
// }

// /**
//  * יצירת Embedding לטקסט (לחיפוש)
//  */
// export async function generateTextEmbedding(text) {
//     try {
//         await initModels();
        
//         // המרת הטקסט לטוקנים
//         const textInputs = await tokenizer([text], { padding: true, truncation: true });
        
//         // הרצת מודל הטקסט - שימוש ב-forward
//         const { text_embeds } = await textModel.forward(textInputs);
        
//         console.log(`✅ Text vector generated for: "${text}"`);
//         return Array.from(text_embeds.data);
//     } catch (error) {
//         console.error("❌ Text embedding error:", error.message);
//         throw error;
//     }
// }

// /**
//  * פונקציית עזר לחישוב דמיון קוסינוס (למקרה שנצטרך להשוות מקומית)
//  */
// export function cosineSimilarity(vecA, vecB) {
//     let dotProduct = 0;
//     let normA = 0;
//     let normB = 0;
//     for (let i = 0; i < vecA.length; i++) {
//         dotProduct += vecA[i] * vecB[i];
//         normA += vecA[i] * vecA[i];
//         normB += vecB[i] * vecB[i];
//     }
//     if (normA === 0 || normB === 0) return 0;
//     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// }
import { 
    AutoProcessor, 
    CLIPVisionModelWithProjection, 
    CLIPTextModelWithProjection, 
    AutoTokenizer, 
    RawImage, 
    env 
} from "@huggingface/transformers";

// הגדרות לטעינה מהרשת בלבד
env.allowRemoteModels = true; 
env.allowLocalModels = false; 

let processor = null;
let visionModel = null;
let textModel = null;
let tokenizer = null;

async function initModels() {
    const modelId = "Xenova/clip-vit-base-patch32"; 
    
    if (!processor) {
        console.log(`🔹 Downloading/Loading models from Hugging Face: ${modelId}...`);
        try {
            tokenizer = await AutoTokenizer.from_pretrained(modelId);
            processor = await AutoProcessor.from_pretrained(modelId);
            
            // שימוש ב-quantized: true הופך את ההורדה להרבה יותר קטנה ומהירה
            visionModel = await CLIPVisionModelWithProjection.from_pretrained(modelId, { quantized: true });
            textModel = await CLIPTextModelWithProjection.from_pretrained(modelId, { quantized: true });
            
            console.log("✅ Models loaded successfully from cloud!");
        } catch (err) {
            console.error("❌ Failed to load remote models:", err.message);
            throw err;
        }
    }
}

export async function generateImageEmbedding(buffer) {
    try {
        await initModels();
        const blob = new Blob([buffer]);
        const image = await RawImage.fromBlob(blob);
        const imageInputs = await processor(image);
        const { image_embeds } = await visionModel.forward(imageInputs);
        return Array.from(image_embeds.data);
    } catch (error) {
        console.error("❌ Image embedding error:", error.message);
        throw error;
    }
}

export async function generateTextEmbedding(text) {
    try {
        await initModels();
        const textInputs = await tokenizer([text], { padding: true, truncation: true });
        const { text_embeds } = await textModel.forward(textInputs);
        return Array.from(text_embeds.data);
    } catch (error) {
        console.error("❌ Text embedding error:", error.message);
        throw error;
    }
}