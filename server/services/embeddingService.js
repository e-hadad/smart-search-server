// // // // // // // // // // // // // // // // // // // // // export const createEmbedding = async (image) => {
// // // // // // // // // // // // // // // // // // // // //   // כאן תשלחי את הקובץ למנוע חיפוש חכם / OCR
// // // // // // // // // // // // // // // // // // // // //   // מחזיר embedding או טקסט שמזוהה
// // // // // // // // // // // // // // // // // // // // //   return "dummy-embedding";
// // // // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // // import { pipeline, RawImage, env } from "@huggingface/transformers";
// // // // // // // // // // // // // // // // // // // // import path from "path";

// // // // // // // // // // // // // // // // // // // // // הגדרת המודל המקומי
// // // // // // // // // // // // // // // // // // // // env.allowRemoteModels = false;
// // // // // // // // // // // // // // // // // // // // env.localModelPath = 'D:/year3/google-drive-smart-search/embeddings/';
// // // // // // // // // // // // // // // // // // // // env.allowLocalModels = true;

// // // // // // // // // // // // // // // // // // // // let embedder = null;

// // // // // // // // // // // // // // // // // // // // // טעינת המודל פעם אחת בלבד
// // // // // // // // // // // // // // // // // // // // async function getEmbedder() {
// // // // // // // // // // // // // // // // // // // //     if (!embedder) {
// // // // // // // // // // // // // // // // // // // //         console.log("🔹 Loading CLIP model...");
// // // // // // // // // // // // // // // // // // // //         embedder = await pipeline("feature-extraction", "clip-vit-base-patch32");
// // // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // // //     return embedder;
// // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // // // // // // // // // // // // // //     const pipe = await getEmbedder();
// // // // // // // // // // // // // // // // // // // //     const blob = new Blob([buffer]);
// // // // // // // // // // // // // // // // // // // //     const image = await RawImage.fromBlob(blob);
// // // // // // // // // // // // // // // // // // // //     const output = await pipe(image);
// // // // // // // // // // // // // // // // // // // //     return Array.from(output.data);
// // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // // // // // // // // // // // // // //     const pipe = await getEmbedder();
// // // // // // // // // // // // // // // // // // // //     const output = await pipe(text);
// // // // // // // // // // // // // // // // // // // //     return Array.from(output.data);
// // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // // // // // // // // // // // // // //     let dotProduct = 0;
// // // // // // // // // // // // // // // // // // // //     let normA = 0;
// // // // // // // // // // // // // // // // // // // //     let normB = 0;
// // // // // // // // // // // // // // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // // // // // // // // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // // // // // // // // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // // // // // // // // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // // //     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // // // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // // import { pipeline, RawImage, env } from "@huggingface/transformers";
// // // // // // // // // // // // // // // // // // // import path from "path";

// // // // // // // // // // // // // // // // // // // // הגדרות סביבה לעבודה מקומית בלבד
// // // // // // // // // // // // // // // // // // // env.allowRemoteModels = false;
// // // // // // // // // // // // // // // // // // // env.allowLocalModels = true;
// // // // // // // // // // // // // // // // // // // // הנתיב מצביע לתיקייה שמכילה את תיקיית המודל
// // // // // // // // // // // // // // // // // // // env.localModelPath = 'D:/year3/google-drive-smart-search/embeddings/'; 

// // // // // // // // // // // // // // // // // // // let embedder = null;

// // // // // // // // // // // // // // // // // // // /**
// // // // // // // // // // // // // // // // // // //  * טעינת המודל פעם אחת בלבד.
// // // // // // // // // // // // // // // // // // //  * הספרייה תחפש את הקבצים בתוך: 
// // // // // // // // // // // // // // // // // // //  * D:/year3/google-drive-smart-search/embeddings/clip-vit-base-patch32/
// // // // // // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // // // // // async function getEmbedder() {
// // // // // // // // // // // // // // // // // // //     if (!embedder) {
// // // // // // // // // // // // // // // // // // //         console.log("🔹 Loading CLIP model from local storage...");
// // // // // // // // // // // // // // // // // // //         try {
// // // // // // // // // // // // // // // // // // //             embedder = await pipeline("feature-extraction", "clip-vit-base-patch32", {
// // // // // // // // // // // // // // // // // // //                 local_files_only: true,
// // // // // // // // // // // // // // // // // // //             });
// // // // // // // // // // // // // // // // // // //             console.log("✅ Model loaded successfully!");
// // // // // // // // // // // // // // // // // // //         } catch (error) {
// // // // // // // // // // // // // // // // // // //             console.error("❌ Error loading model. Please check folder structure.");
// // // // // // // // // // // // // // // // // // //             throw error;
// // // // // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // //     return embedder;
// // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // // // //         const pipe = await getEmbedder();
// // // // // // // // // // // // // // // // // // //         const blob = new Blob([buffer]);
// // // // // // // // // // // // // // // // // // //         const image = await RawImage.fromBlob(blob);
        
// // // // // // // // // // // // // // // // // // //         // יצירת ה-Embedding
// // // // // // // // // // // // // // // // // // //         const output = await pipe(image);
        
// // // // // // // // // // // // // // // // // // //         // המודל מחזיר Tensor, אנחנו הופכים אותו למערך רגיל (Float32Array)
// // // // // // // // // // // // // // // // // // //         return Array.from(output.data);
// // // // // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // // // // //         console.error("Error generating image embedding:", error);
// // // // // // // // // // // // // // // // // // //         throw error;
// // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // // // //         const pipe = await getEmbedder();
// // // // // // // // // // // // // // // // // // //         const output = await pipe(text);
// // // // // // // // // // // // // // // // // // //         return Array.from(output.data);
// // // // // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // // // // //         console.error("Error generating text embedding:", error);
// // // // // // // // // // // // // // // // // // //         throw error;
// // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // // // // // // // // // // // // //     let dotProduct = 0;
// // // // // // // // // // // // // // // // // // //     let normA = 0;
// // // // // // // // // // // // // // // // // // //     let normB = 0;
// // // // // // // // // // // // // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // // // // // // // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // // // // // // // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // // // // // // // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // //     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // import { pipeline, RawImage } from "@huggingface/transformers";

// // // // // // // // // // // // // // // // // // let embedder = null;

// // // // // // // // // // // // // // // // // // /**
// // // // // // // // // // // // // // // // // //  * טעינת המודל - אם הוא לא קיים במחשב, הוא יורד אוטומטית מהאינטרנט
// // // // // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // // // // async function getEmbedder() {
// // // // // // // // // // // // // // // // // //     if (!embedder) {
// // // // // // // // // // // // // // // // // //         console.log("🔹 Loading CLIP model (it might take a moment to download on first run)...");
// // // // // // // // // // // // // // // // // //         try {
// // // // // // // // // // // // // // // // // //             // הספרייה תוריד לבד את clip-vit-base-patch32 מהשרתים של Hugging Face
// // // // // // // // // // // // // // // // // //             embedder = await pipeline("feature-extraction", "Xenova/clip-vit-base-patch32");
// // // // // // // // // // // // // // // // // //             console.log("✅ Model ready!");
// // // // // // // // // // // // // // // // // //         } catch (error) {
// // // // // // // // // // // // // // // // // //             console.error("❌ Error loading model from internet:", error);
// // // // // // // // // // // // // // // // // //             throw error;
// // // // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //     return embedder;
// // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // // // // // // // // // // // //     const pipe = await getEmbedder();
// // // // // // // // // // // // // // // // // //     const blob = new Blob([buffer]);
// // // // // // // // // // // // // // // // // //     const image = await RawImage.fromBlob(blob);
// // // // // // // // // // // // // // // // // //     const output = await pipe(image);
// // // // // // // // // // // // // // // // // //     return Array.from(output.data);
// // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // // // // // // // // // // // //     const pipe = await getEmbedder();
// // // // // // // // // // // // // // // // // //     const output = await pipe(text);
// // // // // // // // // // // // // // // // // //     return Array.from(output.data);
// // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // // // // // // // // // // // //     let dotProduct = 0;
// // // // // // // // // // // // // // // // // //     let normA = 0;
// // // // // // // // // // // // // // // // // //     let normB = 0;
// // // // // // // // // // // // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // // // // // // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // // // // // // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // // // // // // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // import { AutoProcessor, CLIPVisionModelWithProjection, CLIPTextModelWithProjection, AutoTokenizer, RawImage } from "@huggingface/transformers";

// // // // // // // // // // // // // // // // // let processor = null;
// // // // // // // // // // // // // // // // // let visionModel = null;
// // // // // // // // // // // // // // // // // let textModel = null;
// // // // // // // // // // // // // // // // // let tokenizer = null;

// // // // // // // // // // // // // // // // // // פונקציה לטעינת כל הרכיבים
// // // // // // // // // // // // // // // // // async function initModels() {
// // // // // // // // // // // // // // // // //     const modelId = "Xenova/clip-vit-base-patch32";
    
// // // // // // // // // // // // // // // // //     if (!processor) {
// // // // // // // // // // // // // // // // //         console.log("🔹 Loading LIGHTWEIGHT CLIP components...");
// // // // // // // // // // // // // // // // //         processor = await AutoProcessor.from_pretrained(modelId);
// // // // // // // // // // // // // // // // //         tokenizer = await AutoTokenizer.from_pretrained(modelId);
        
// // // // // // // // // // // // // // // // //         // הוספת quantized: true הופכת את המודל לקטן ומהיר פי 4!
// // // // // // // // // // // // // // // // //         visionModel = await CLIPVisionModelWithProjection.from_pretrained(modelId, { quantized: true });
// // // // // // // // // // // // // // // // //         textModel = await CLIPTextModelWithProjection.from_pretrained(modelId, { quantized: true });
        
// // // // // // // // // // // // // // // // //         console.log("✅ Lightweight CLIP loaded!");
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // /**
// // // // // // // // // // // // // // // // //  * יצירת Embedding לתמונה
// // // // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //         await initModels();
        
// // // // // // // // // // // // // // // // //         const blob = new Blob([buffer]);
// // // // // // // // // // // // // // // // //         const image = await RawImage.fromBlob(blob);
        
// // // // // // // // // // // // // // // // //         // שלב קריטי: הפיכת התמונה ל-pixel_values שהמודל דורש
// // // // // // // // // // // // // // // // //         const imageInputs = await processor(image);
        
// // // // // // // // // // // // // // // // //         // הרצת מודל הראייה
// // // // // // // // // // // // // // // // //         const { image_embeds } = await visionModel(imageInputs);
        
// // // // // // // // // // // // // // // // //         // החזרת הנתונים כמערך פשוט
// // // // // // // // // // // // // // // // //         return Array.from(image_embeds.data);
// // // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // // //         console.error("❌ Image embedding error:", error.message);
// // // // // // // // // // // // // // // // //         throw error;
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // /**
// // // // // // // // // // // // // // // // //  * יצירת Embedding לטקסט
// // // // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //         await initModels();
        
// // // // // // // // // // // // // // // // //         // המרת הטקסט לטוקנים
// // // // // // // // // // // // // // // // //         const textInputs = await tokenizer([text], { padding: true, truncation: true });
        
// // // // // // // // // // // // // // // // //         // הרצת מודל הטקסט
// // // // // // // // // // // // // // // // //         const { text_embeds } = await textModel(textInputs);
        
// // // // // // // // // // // // // // // // //         return Array.from(text_embeds.data);
// // // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // // //         console.error("❌ Text embedding error:", error.message);
// // // // // // // // // // // // // // // // //         throw error;
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // /**
// // // // // // // // // // // // // // // // //  * חישוב דמיון קוסינוס
// // // // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // // // // // // // // // // //     let dotProduct = 0;
// // // // // // // // // // // // // // // // //     let normA = 0;
// // // // // // // // // // // // // // // // //     let normB = 0;
// // // // // // // // // // // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // // // // // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // // // // // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // // // // // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //     if (normA === 0 || normB === 0) return 0;
// // // // // // // // // // // // // // // // //     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // import { AutoProcessor, CLIPVisionModelWithProjection, CLIPTextModelWithProjection, AutoTokenizer, RawImage } from "@huggingface/transformers";

// // // // // // // // // // // // // // // // let processor = null;
// // // // // // // // // // // // // // // // let visionModel = null;
// // // // // // // // // // // // // // // // let textModel = null;
// // // // // // // // // // // // // // // // let tokenizer = null;

// // // // // // // // // // // // // // // // async function initModels() {
// // // // // // // // // // // // // // // //     const modelId = "Xenova/clip-vit-base-patch32";
    
// // // // // // // // // // // // // // // //     if (!processor) {
// // // // // // // // // // // // // // // //         console.log("🔹 Loading LIGHTWEIGHT CLIP components...");
// // // // // // // // // // // // // // // //         try {
// // // // // // // // // // // // // // // //             processor = await AutoProcessor.from_pretrained(modelId);
// // // // // // // // // // // // // // // //             tokenizer = await AutoTokenizer.from_pretrained(modelId);
            
// // // // // // // // // // // // // // // //             // טעינה עם quantized: true לחיסכון בזיכרון
// // // // // // // // // // // // // // // //             visionModel = await CLIPVisionModelWithProjection.from_pretrained(modelId, { quantized: true });
// // // // // // // // // // // // // // // //             textModel = await CLIPTextModelWithProjection.from_pretrained(modelId, { quantized: true });
            
// // // // // // // // // // // // // // // //             console.log("✅ Lightweight CLIP loaded!");
// // // // // // // // // // // // // // // //         } catch (err) {
// // // // // // // // // // // // // // // //             console.error("❌ Failed to load models:", err.message);
// // // // // // // // // // // // // // // //             throw err;
// // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //         await initModels();
// // // // // // // // // // // // // // // //         const blob = new Blob([buffer]);
// // // // // // // // // // // // // // // //         const image = await RawImage.fromBlob(blob);
// // // // // // // // // // // // // // // //         const imageInputs = await processor(image);
        
// // // // // // // // // // // // // // // //         // תיקון: שימוש ב-forward במקום קריאה ישירה לאובייקט
// // // // // // // // // // // // // // // //         const { image_embeds } = await visionModel.forward(imageInputs);
        
// // // // // // // // // // // // // // // //         return Array.from(image_embeds.data);
// // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // //         console.error("❌ Image embedding error:", error.message);
// // // // // // // // // // // // // // // //         throw error;
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //         await initModels();
// // // // // // // // // // // // // // // //         const textInputs = await tokenizer([text], { padding: true, truncation: true });
        
// // // // // // // // // // // // // // // //         // תיקון: שימוש ב-forward גם כאן
// // // // // // // // // // // // // // // //         const { text_embeds } = await textModel.forward(textInputs);
        
// // // // // // // // // // // // // // // //         return Array.from(text_embeds.data);
// // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // //         console.error("❌ Text embedding error:", error.message);
// // // // // // // // // // // // // // // //         throw error;
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // // // // // // // // // //     let dotProduct = 0;
// // // // // // // // // // // // // // // //     let normA = 0;
// // // // // // // // // // // // // // // //     let normB = 0;
// // // // // // // // // // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // // // // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // // // // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // // // // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //     if (normA === 0 || normB === 0) return 0;
// // // // // // // // // // // // // // // //     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // import { AutoProcessor, CLIPVisionModelWithProjection, CLIPTextModelWithProjection, AutoTokenizer, RawImage, env } from "@huggingface/transformers";

// // // // // // // // // // // // // // // // הגדרה שתראה לנו התקדמות הורדה בטרמינל
// // // // // // // // // // // // // // // env.remoteHost = "https://huggingface.co/";

// // // // // // // // // // // // // // // let processor = null;
// // // // // // // // // // // // // // // let visionModel = null;
// // // // // // // // // // // // // // // let textModel = null;
// // // // // // // // // // // // // // // let tokenizer = null;

// // // // // // // // // // // // // // // async function initModels() {
// // // // // // // // // // // // // // //     const modelId = "Xenova/clip-vit-base-patch32";
    
// // // // // // // // // // // // // // //     if (!processor) {
// // // // // // // // // // // // // // //         console.log("🔹 Initializing CLIP components (this may take a few minutes for the first time)...");
// // // // // // // // // // // // // // //         try {
// // // // // // // // // // // // // // //             // טעינה טורית כדי לא להעמיס על הזיכרון
// // // // // // // // // // // // // // //             tokenizer = await AutoTokenizer.from_pretrained(modelId);
// // // // // // // // // // // // // // //             processor = await AutoProcessor.from_pretrained(modelId);
            
// // // // // // // // // // // // // // //             console.log("🔹 Loading Vision Model (Quantized)...");
// // // // // // // // // // // // // // //             visionModel = await CLIPVisionModelWithProjection.from_pretrained(modelId, { quantized: true });
            
// // // // // // // // // // // // // // //             console.log("🔹 Loading Text Model (Quantized)...");
// // // // // // // // // // // // // // //             textModel = await CLIPTextModelWithProjection.from_pretrained(modelId, { quantized: true });
            
// // // // // // // // // // // // // // //             console.log("✅ All CLIP components loaded successfully!");
// // // // // // // // // // // // // // //         } catch (err) {
// // // // // // // // // // // // // // //             console.error("❌ Failed to load models:", err.message);
// // // // // // // // // // // // // // //             processor = null; // איפוס כדי שנוכל לנסות שוב
// // // // // // // // // // // // // // //             throw err;
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // שאר הפונקציות (generateImageEmbedding וכו') נשארות אותו דבר כמו שנתתי לך קודם
// // // // // // // // // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //         await initModels();
// // // // // // // // // // // // // // //         const blob = new Blob([buffer]);
// // // // // // // // // // // // // // //         const image = await RawImage.fromBlob(blob);
// // // // // // // // // // // // // // //         const imageInputs = await processor(image);
// // // // // // // // // // // // // // //         const { image_embeds } = await visionModel.forward(imageInputs);
// // // // // // // // // // // // // // //         return Array.from(image_embeds.data);
// // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // //         console.error("❌ Image embedding error:", error.message);
// // // // // // // // // // // // // // //         throw error;
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //         await initModels();
// // // // // // // // // // // // // // //         const textInputs = await tokenizer([text], { padding: true, truncation: true });
// // // // // // // // // // // // // // //         const { text_embeds } = await textModel.forward(textInputs);
// // // // // // // // // // // // // // //         return Array.from(text_embeds.data);
// // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // //         console.error("❌ Text embedding error:", error.message);
// // // // // // // // // // // // // // //         throw error;
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // // // // // // // // //     let dotProduct = 0; let normA = 0; let normB = 0;
// // // // // // // // // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // // // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // // // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // // // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //     if (normA === 0 || normB === 0) return 0;
// // // // // // // // // // // // // // //     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // import { AutoProcessor, CLIPVisionModelWithProjection, CLIPTextModelWithProjection, AutoTokenizer, RawImage, env } from "@huggingface/transformers";
// // // // // // // // // // // // // // import path from 'path';

// // // // // // // // // // // // // // // הגדרות עבודה מקומית
// // // // // // // // // // // // // // env.allowRemoteModels = false; // חוסם פנייה לאינטרנט
// // // // // // // // // // // // // // env.localModelPath = path.join(process.cwd()); // מגדיר את תיקיית ה-server כבסיס

// // // // // // // // // // // // // // let processor = null;
// // // // // // // // // // // // // // let visionModel = null;
// // // // // // // // // // // // // // let textModel = null;
// // // // // // // // // // // // // // let tokenizer = null;

// // // // // // // // // // // // // // async function initModels() {
// // // // // // // // // // // // // //     // הנתיב היחסי מה-server לתיקיית המודל
// // // // // // // // // // // // // //     const modelId = "embeddings/clip-vit-base-patch32";
    
// // // // // // // // // // // // // //     if (!processor) {
// // // // // // // // // // // // // //         console.log(`🔹 Loading LOCAL CLIP components from: ${modelId}...`);
// // // // // // // // // // // // // //         try {
// // // // // // // // // // // // // //             // טעינת רכיבי העיבוד
// // // // // // // // // // // // // //             tokenizer = await AutoTokenizer.from_pretrained(modelId);
// // // // // // // // // // // // // //             processor = await AutoProcessor.from_pretrained(modelId);
            
// // // // // // // // // // // // // //             // טעינת המודלים מהדיסק
// // // // // // // // // // // // // //             // אם הקבצים שלך הם הגרסה הרגילה, השאירי כך. 
// // // // // // // // // // // // // //             // אם הם quantized, אפשר להוסיף { quantized: true }
// // // // // // // // // // // // // //             visionModel = await CLIPVisionModelWithProjection.from_pretrained(modelId);
// // // // // // // // // // // // // //             textModel = await CLIPTextModelWithProjection.from_pretrained(modelId);
            
// // // // // // // // // // // // // //             console.log("✅ Successfully loaded CLIP from local embeddings folder!");
// // // // // // // // // // // // // //         } catch (err) {
// // // // // // // // // // // // // //             console.error("❌ local load error. Please verify that 'embeddings/clip-vit-base-patch32' exists and contains .onnx files.");
// // // // // // // // // // // // // //             console.error("Details:", err.message);
// // // // // // // // // // // // // //             throw err;
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //         await initModels();
// // // // // // // // // // // // // //         const blob = new Blob([buffer]);
// // // // // // // // // // // // // //         const image = await RawImage.fromBlob(blob);
// // // // // // // // // // // // // //         const imageInputs = await processor(image);
// // // // // // // // // // // // // //         const { image_embeds } = await visionModel.forward(imageInputs);
// // // // // // // // // // // // // //         return Array.from(image_embeds.data);
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //         console.error("❌ Image embedding error:", error.message);
// // // // // // // // // // // // // //         throw error;
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //         await initModels();
// // // // // // // // // // // // // //         const textInputs = await tokenizer([text], { padding: true, truncation: true });
// // // // // // // // // // // // // //         const { text_embeds } = await textModel.forward(textInputs);
// // // // // // // // // // // // // //         return Array.from(text_embeds.data);
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //         console.error("❌ Text embedding error:", error.message);
// // // // // // // // // // // // // //         throw error;
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // // // // // // // //     let dotProduct = 0; let normA = 0; let normB = 0;
// // // // // // // // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //     if (normA === 0 || normB === 0) return 0;
// // // // // // // // // // // // // //     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // // // // // // // // // // // // // }
// // // // // // // // // // // // // import { 
// // // // // // // // // // // // //     AutoProcessor, 
// // // // // // // // // // // // //     CLIPVisionModelWithProjection, 
// // // // // // // // // // // // //     CLIPTextModelWithProjection, 
// // // // // // // // // // // // //     AutoTokenizer, 
// // // // // // // // // // // // //     RawImage, 
// // // // // // // // // // // // //     env 
// // // // // // // // // // // // // } from "@huggingface/transformers";
// // // // // // // // // // // // // import path from 'path';

// // // // // // // // // // // // // // הגדרות עבודה מקומית - מונע ניסיונות הורדה מהאינטרנט ומחפש בתיקייה המקומית
// // // // // // // // // // // // // env.allowRemoteModels = false; 
// // // // // // // // // // // // // env.localModelPath = path.join(process.cwd()); 

// // // // // // // // // // // // // let processor = null;
// // // // // // // // // // // // // let visionModel = null;
// // // // // // // // // // // // // let textModel = null;
// // // // // // // // // // // // // let tokenizer = null;

// // // // // // // // // // // // // // פונקציית אתחול פנימית - נטענת רק פעם אחת בזיכרון
// // // // // // // // // // // // // async function initModels() {
// // // // // // // // // // // // //     const modelId = "embeddings/clip-vit-base-patch32";
    
// // // // // // // // // // // // //     if (!processor) {
// // // // // // // // // // // // //         console.log(`🔹 Loading LOCAL CLIP components from: ${modelId}...`);
// // // // // // // // // // // // //         try {
// // // // // // // // // // // // //             tokenizer = await AutoTokenizer.from_pretrained(modelId);
// // // // // // // // // // // // //             processor = await AutoProcessor.from_pretrained(modelId);
            
// // // // // // // // // // // // //             visionModel = await CLIPVisionModelWithProjection.from_pretrained(modelId);
// // // // // // // // // // // // //             textModel = await CLIPTextModelWithProjection.from_pretrained(modelId);
            
// // // // // // // // // // // // //             console.log("✅ Successfully loaded CLIP from local embeddings folder!");
// // // // // // // // // // // // //         } catch (err) {
// // // // // // // // // // // // //             console.error("❌ local load error. Verify folder structure.");
// // // // // // // // // // // // //             throw err;
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //     }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // /**
// // // // // // // // // // // // //  * הפיכת תמונה לוקטור (שימוש בזמן סריקת הדרייב)
// // // // // // // // // // // // //  */
// // // // // // // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //         await initModels();
// // // // // // // // // // // // //         const blob = new Blob([buffer]);
// // // // // // // // // // // // //         const image = await RawImage.fromBlob(blob);
// // // // // // // // // // // // //         const imageInputs = await processor(image);
// // // // // // // // // // // // //         const { image_embeds } = await visionModel.forward(imageInputs);
// // // // // // // // // // // // //         return Array.from(image_embeds.data);
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //         console.error("❌ Image embedding error:", error.message);
// // // // // // // // // // // // //         throw error;
// // // // // // // // // // // // //     }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // /**
// // // // // // // // // // // // //  * הפיכת טקסט לוקטור (שימוש בזמן חיפוש מהתוסף)
// // // // // // // // // // // // //  */
// // // // // // // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //         await initModels();
// // // // // // // // // // // // //         const textInputs = await tokenizer([text], { padding: true, truncation: true });
// // // // // // // // // // // // //         const { text_embeds } = await textModel.forward(textInputs);
// // // // // // // // // // // // //         return Array.from(text_embeds.data);
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //         console.error("❌ Text embedding error:", error.message);
// // // // // // // // // // // // //         throw error;
// // // // // // // // // // // // //     }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // /**
// // // // // // // // // // // // //  * פונקציית השוואה בין וקטורים (Cosine Similarity)
// // // // // // // // // // // // //  * כוללת הגנות מפני וקטורים לא תקינים או חלוקה ב-0
// // // // // // // // // // // // //  */
// // // // // // // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // // // // // // //     if (!vecA || !vecB || vecA.length !== vecB.length) {
// // // // // // // // // // // // //         return 0; 
// // // // // // // // // // // // //     }
    
// // // // // // // // // // // // //     let dotProduct = 0; 
// // // // // // // // // // // // //     let normA = 0; 
// // // // // // // // // // // // //     let normB = 0;
    
// // // // // // // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // // // // // // //     }
    
// // // // // // // // // // // // //     if (normA === 0 || normB === 0) return 0;
    
// // // // // // // // // // // // //     const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    
// // // // // // // // // // // // //     // החזרת 0 במקרה של שגיאה חישובית (NaN)
// // // // // // // // // // // // //     return isNaN(similarity) ? 0 : similarity;
// // // // // // // // // // // // // }
// // // // // // // // // // // // import fetch from 'node-fetch';
// // // // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // const HF_TOKEN = process.env.HF_TOKEN;
// // // // // // // // // // // // // מודל CLIP של OpenAI שיושב ב-Hugging Face
// // // // // // // // // // // // const MODEL_ID = "openai/clip-vit-base-patch32"; 

// // // // // // // // // // // // async function queryHF(data, isText = false) {
// // // // // // // // // // // //     // const response = await fetch(
// // // // // // // // // // // //     //     `https://api-inference.huggingface.co/models/${MODEL_ID}`,
// // // // // // // // // // // //     //     {
// // // // // // // // // // // //     //         headers: { Authorization: `Bearer ${HF_TOKEN}` },
// // // // // // // // // // // //     //         method: "POST",
// // // // // // // // // // // //     //         body: isText ? JSON.stringify({ inputs: data }) : data,
// // // // // // // // // // // //     //     }
// // // // // // // // // // // //     // );
// // // // // // // // // // // //     const response = await fetch(
// // // // // // // // // // // //     `https://router.huggingface.co/hf-inference/models/${MODEL_ID}`, 
// // // // // // // // // // // //     {
// // // // // // // // // // // //         headers: { 
// // // // // // // // // // // //             "Authorization": `Bearer ${HF_TOKEN}`,
// // // // // // // // // // // //             "Content-Type": "application/json" // כדאי להוסיף את זה
// // // // // // // // // // // //         },
// // // // // // // // // // // //         method: "POST",
// // // // // // // // // // // //         body: isText ? JSON.stringify({ inputs: data }) : data,
// // // // // // // // // // // //     }
// // // // // // // // // // // // );
    
// // // // // // // // // // // //     if (!response.ok) {
// // // // // // // // // // // //         const error = await response.text();
// // // // // // // // // // // //         throw new Error(`Hugging Face Error: ${error}`);
// // // // // // // // // // // //     }

// // // // // // // // // // // //     return await response.json();
// // // // // // // // // // // // }

// // // // // // // // // // // // // הפיכת תמונה לוקטור
// // // // // // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //         const result = await queryHF(buffer);
// // // // // // // // // // // //         // CLIP מחזיר וקטור בדרך כלל במיקום הראשון
// // // // // // // // // // // //         return Array.isArray(result) ? result : result[0];
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //         console.error("❌ Image Embedding Error:", error);
// // // // // // // // // // // //         throw error;
// // // // // // // // // // // //     }
// // // // // // // // // // // // }

// // // // // // // // // // // // // הפיכת טקסט לוקטור
// // // // // // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //         const result = await queryHF(text, true);
// // // // // // // // // // // //         return Array.isArray(result) ? result : result[0];
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //         console.error("❌ Text Embedding Error:", error);
// // // // // // // // // // // //         throw error;
// // // // // // // // // // // //     }
// // // // // // // // // // // // }

// // // // // // // // // // // // // פונקציה לבדיקת דמיון (לשימוש מקומי אם צריך)
// // // // // // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // // // // // //     let dotProduct = 0, normA = 0, normB = 0;
// // // // // // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // // // // // //     }
// // // // // // // // // // // //     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // // // // // // // // // // // }
// // // // // // // // // // // import fetch from 'node-fetch';
// // // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // // dotenv.config();

// // // // // // // // // // // const HF_TOKEN = process.env.HF_TOKEN;
// // // // // // // // // // // // המודל הספציפי של OpenAI לניתוח תמונות וטקסט
// // // // // // // // // // // const MODEL_ID = "openai/clip-vit-base-patch32"; 

// // // // // // // // // // // /**
// // // // // // // // // // //  * פונקציה מרכזית לשליחת בקשות ל-Hugging Face
// // // // // // // // // // //  */
// // // // // // // // // // // async function queryHF(data, isText = false) {
// // // // // // // // // // //     // פורמט ה-URL המדויק ביותר עבור ה-Router החדש
// // // // // // // // // // //     const url = `https://router.huggingface.co/hf-inference/models/${MODEL_ID}`;
    
// // // // // // // // // // //     try {
// // // // // // // // // // //         const response = await fetch(url, {
// // // // // // // // // // //             headers: { 
// // // // // // // // // // //                 "Authorization": `Bearer ${HF_TOKEN}`,
// // // // // // // // // // //                 "Content-Type": "application/json"
// // // // // // // // // // //             },
// // // // // // // // // // //             method: "POST",
// // // // // // // // // // //             body: isText ? JSON.stringify({ inputs: data }) : data,
// // // // // // // // // // //         });

// // // // // // // // // // //         const responseText = await response.text();

// // // // // // // // // // //         if (!response.ok) {
// // // // // // // // // // //             // אם עדיין יש 404, סימן שהמודל הזה ספציפית לא נתמך ב-Serverless API כרגע
// // // // // // // // // // //             if (response.status === 404) {
// // // // // // // // // // //                 console.error("❌ מודל לא נמצא. ייתכן והמודל כבד מדי או דורש מנוי.");
// // // // // // // // // // //             }
// // // // // // // // // // //             throw new Error(`HF_${response.status}: ${responseText}`);
// // // // // // // // // // //         }

// // // // // // // // // // //         return JSON.parse(responseText);

// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //         throw err;
// // // // // // // // // // //     }
// // // // // // // // // // // }

// // // // // // // // // // // /**
// // // // // // // // // // //  * הפיכת תמונה לוקטור (Embedding)
// // // // // // // // // // //  */
// // // // // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // // // // //     try {
// // // // // // // // // // //         console.log("⏳ Generating Image Embedding...");
// // // // // // // // // // //         const result = await queryHF(buffer, false);
        
// // // // // // // // // // //         // CLIP מחזיר מערך של מספרים
// // // // // // // // // // //         const embedding = Array.isArray(result) ? result : result[0];
// // // // // // // // // // //         console.log("✅ Image Embedding Generated Successfully");
// // // // // // // // // // //         return embedding;
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //         console.error("❌ Image Embedding Error:", error.message);
// // // // // // // // // // //         throw error;
// // // // // // // // // // //     }
// // // // // // // // // // // }

// // // // // // // // // // // /**
// // // // // // // // // // //  * הפיכת טקסט לוקטור (Embedding)
// // // // // // // // // // //  */
// // // // // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // // // // //     try {
// // // // // // // // // // //         console.log(`⏳ Generating Text Embedding for: "${text}"`);
// // // // // // // // // // //         const result = await queryHF(text, true);
        
// // // // // // // // // // //         const embedding = Array.isArray(result) ? result : result[0];
// // // // // // // // // // //         console.log("✅ Text Embedding Generated Successfully");
// // // // // // // // // // //         return embedding;
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //         console.error("❌ Text Embedding Error:", error.message);
// // // // // // // // // // //         throw error;
// // // // // // // // // // //     }
// // // // // // // // // // // }

// // // // // // // // // // // /**
// // // // // // // // // // //  * חישוב דמיון קוסינוס בין שני וקטורים (לשימוש מקומי במקרה הצורך)
// // // // // // // // // // //  */
// // // // // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // // // // //     let dotProduct = 0, normA = 0, normB = 0;
// // // // // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // // // // //     }
// // // // // // // // // // //     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // // // // // // // // // // }
// // // // // // // // // // import fetch from 'node-fetch';
// // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // dotenv.config();

// // // // // // // // // // const HF_TOKEN = process.env.HF_TOKEN;
// // // // // // // // // // const MODEL_ID = "sentence-transformers/all-MiniLM-L6-v2"; 

// // // // // // // // // // /**
// // // // // // // // // //  * פונקציה מרכזית לשליחת בקשות ל-Hugging Face
// // // // // // // // // //  * משתמשת בכתובת ה-Router החדשה (2026)
// // // // // // // // // //  */
// // // // // // // // // // async function queryHF(data) {
// // // // // // // // // //     // זו הכתובת היחידה שנתמכת כרגע
// // // // // // // // // //     const url = `https://router.huggingface.co/hf-inference/models/${MODEL_ID}`;
    
// // // // // // // // // //     try {
// // // // // // // // // //         const response = await fetch(url, {
// // // // // // // // // //             headers: { 
// // // // // // // // // //                 "Authorization": `Bearer ${HF_TOKEN}`,
// // // // // // // // // //                 "Content-Type": "application/json"
// // // // // // // // // //             },
// // // // // // // // // //             method: "POST",
// // // // // // // // // //             // למודל הזה חייבים לשלוח אובייקט עם inputs ופרמטרים ריקים
// // // // // // // // // //             body: JSON.stringify({ 
// // // // // // // // // //                 inputs: data,
// // // // // // // // // //                 parameters: {} 
// // // // // // // // // //             }),
// // // // // // // // // //         });

// // // // // // // // // //         const responseData = await response.json();

// // // // // // // // // //         if (!response.ok) {
// // // // // // // // // //             throw new Error(`HF_${response.status}: ${JSON.stringify(responseData)}`);
// // // // // // // // // //         }

// // // // // // // // // //         return responseData;
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //         throw err;
// // // // // // // // // //     }
// // // // // // // // // // }

// // // // // // // // // // /**
// // // // // // // // // //  * הפיכת טקסט לוקטור (Embedding)
// // // // // // // // // //  */
// // // // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // // // //     try {
// // // // // // // // // //         if (!text) throw new Error("Text is required");
        
// // // // // // // // // //         console.log(`⏳ Generating Text Embedding for: "${text}"`);
// // // // // // // // // //         const result = await queryHF(text);
        
// // // // // // // // // //         // המודל מחזיר מערך מספרים (הוקטור). לעיתים הוא עטוף במערך כפול.
// // // // // // // // // //         let embedding = Array.isArray(result[0]) ? result[0] : result;

// // // // // // // // // //         console.log("✅ Text Embedding Generated Successfully");
// // // // // // // // // //         return embedding;
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //         console.error("❌ Text Embedding Error:", error.message);
// // // // // // // // // //         throw error;
// // // // // // // // // //     }
// // // // // // // // // // }

// // // // // // // // // // /**
// // // // // // // // // //  * פונקציות נוספות לשמירה על תקינות המערכת
// // // // // // // // // //  */
// // // // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // // // //     console.warn("⚠️ מודל טקסט בלבד. מחזיר וקטור ריק.");
// // // // // // // // // //     return new Array(384).fill(0);
// // // // // // // // // // }

// // // // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // // // //     if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
// // // // // // // // // //     let dotProduct = 0, normA = 0, normB = 0;
// // // // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // // // //     }
// // // // // // // // // //     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // // // // // // // // // }


// // // // // // // // // import fetch from 'node-fetch';
// // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // dotenv.config();

// // // // // // // // // const HF_TOKEN = process.env.HF_TOKEN;
// // // // // // // // // // שימוש בנתיב ה-Router המעודכן ל-2026
// // // // // // // // // const MODEL_ID = "sentence-transformers/all-MiniLM-L6-v2";

// // // // // // // // // /**
// // // // // // // // //  * פונקציה לשליחת בקשה להפקת וקטור (Embedding)
// // // // // // // // //  */
// // // // // // // // // async function queryHF(text) {
// // // // // // // // //     const url = `https://router.huggingface.co/hf-inference/models/${MODEL_ID}`;
    
// // // // // // // // //     const response = await fetch(url, {
// // // // // // // // //         headers: { 
// // // // // // // // //             "Authorization": `Bearer ${HF_TOKEN}`,
// // // // // // // // //             "Content-Type": "application/json" 
// // // // // // // // //         },
// // // // // // // // //         method: "POST",
// // // // // // // // //         // המבנה הזה קריטי כדי למנוע את שגיאת ה-"missing sentences"
// // // // // // // // //         body: JSON.stringify({ 
// // // // // // // // //             inputs: text,
// // // // // // // // //             parameters: {} 
// // // // // // // // //         }),
// // // // // // // // //     });

// // // // // // // // //     const result = await response.json();

// // // // // // // // //     if (!response.ok) {
// // // // // // // // //         throw new Error(`HF_${response.status}: ${JSON.stringify(result)}`);
// // // // // // // // //     }

// // // // // // // // //     return result;
// // // // // // // // // }

// // // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // // //     try {
// // // // // // // // //         if (!text) throw new Error("Text is required");
// // // // // // // // //         console.log(`⏳ Generating Text Embedding for: "${text}"`);
        
// // // // // // // // //         const result = await queryHF(text);
        
// // // // // // // // //         // המודל מחזיר מערך של מספרים. אם הוא מחזיר מערך כפול [[...]], נשטח אותו.
// // // // // // // // //         const embedding = Array.isArray(result[0]) ? result[0] : result;

// // // // // // // // //         console.log("✅ Text Embedding Generated Successfully");
// // // // // // // // //         return embedding;
// // // // // // // // //     } catch (error) {
// // // // // // // // //         console.error("❌ Text Embedding Error:", error.message);
// // // // // // // // //         throw error;
// // // // // // // // //     }
// // // // // // // // // }

// // // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // // //     // מודל טקסט בלבד - מחזיר וקטור אפסים באורך 384
// // // // // // // // //     return new Array(384).fill(0);
// // // // // // // // // }

// // // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // // //     if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
// // // // // // // // //     let dotProduct = 0, normA = 0, normB = 0;
// // // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // // //     }
// // // // // // // // //     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // // // // // // // // }
// // // // // // // // import fetch from 'node-fetch';
// // // // // // // // import dotenv from 'dotenv';

// // // // // // // // dotenv.config();

// // // // // // // // const HF_TOKEN = process.env.HF_TOKEN;
// // // // // // // // const MODEL_ID = "sentence-transformers/all-MiniLM-L6-v2";

// // // // // // // // async function queryHF(text) {
// // // // // // // //     // התיקון הקריטי: הוספת הנתיב הישיר ל-feature-extraction
// // // // // // // //     const url = `https://router.huggingface.co/hf-inference/models/${MODEL_ID}/pipeline/feature-extraction`;
    
// // // // // // // //     const response = await fetch(url, {
// // // // // // // //         headers: { 
// // // // // // // //             "Authorization": `Bearer ${HF_TOKEN}`,
// // // // // // // //             "Content-Type": "application/json" 
// // // // // // // //         },
// // // // // // // //         method: "POST",
// // // // // // // //         // שולחים כטקסט פשוט בתוך inputs
// // // // // // // //         body: JSON.stringify({ 
// // // // // // // //             inputs: text,
// // // // // // // //             options: { wait_for_model: true }
// // // // // // // //         }),
// // // // // // // //     });

// // // // // // // //     const result = await response.json();

// // // // // // // //     if (!response.ok) {
// // // // // // // //         throw new Error(`HF_${response.status}: ${JSON.stringify(result)}`);
// // // // // // // //     }

// // // // // // // //     return result;
// // // // // // // // }

// // // // // // // // export async function generateTextEmbedding(text) {
// // // // // // // //     try {
// // // // // // // //         if (!text) throw new Error("Text is required");
// // // // // // // //         console.log(`⏳ Generating Text Embedding for: "${text}"`);
        
// // // // // // // //         const result = await queryHF(text);
        
// // // // // // // //         // ב-Feature Extraction מקבלים מערך של וקטורים (לפעמים תלת-ממדי)
// // // // // // // //         // אנחנו צריכים את הוקטור המשוטח
// // // // // // // //         let embedding = result;
// // // // // // // //         if (Array.isArray(result[0])) embedding = result[0];
// // // // // // // //         if (Array.isArray(embedding[0])) embedding = embedding[0];

// // // // // // // //         console.log(`✅ Text Embedding Generated Successfully (Size: ${embedding.length})`);
// // // // // // // //         return embedding;
// // // // // // // //     } catch (error) {
// // // // // // // //         console.error("❌ Text Embedding Error:", error.message);
// // // // // // // //         throw error;
// // // // // // // //     }
// // // // // // // // }

// // // // // // // // // שאר הפונקציות (generateImageEmbedding, cosineSimilarity) נשארות כפי שהן
// // // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // // //     return new Array(384).fill(0);
// // // // // // // // }

// // // // // // // // export function cosineSimilarity(vecA, vecB) {
// // // // // // // //     if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
// // // // // // // //     let dotProduct = 0, normA = 0, normB = 0;
// // // // // // // //     for (let i = 0; i < vecA.length; i++) {
// // // // // // // //         dotProduct += vecA[i] * vecB[i];
// // // // // // // //         normA += vecA[i] * vecA[i];
// // // // // // // //         normB += vecB[i] * vecB[i];
// // // // // // // //     }
// // // // // // // //     return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // // // // // // // }
// // // // // // // import fetch from 'node-fetch';
// // // // // // // import dotenv from 'dotenv';

// // // // // // // dotenv.config();

// // // // // // // const HF_TOKEN = process.env.HF_TOKEN;
// // // // // // // // מודל CLIP - הכי טוב לחיפוש תמונות לפי טקסט
// // // // // // // const IMAGE_MODEL = "openai/clip-vit-base-patch32"; 

// // // // // // // async function queryHF(data, isImage = false) {
// // // // // // //     const url = `https://api-inference.huggingface.co/models/${IMAGE_MODEL}`;
    
// // // // // // //     const response = await fetch(url, {
// // // // // // //         headers: { "Authorization": `Bearer ${HF_TOKEN}` },
// // // // // // //         method: "POST",
// // // // // // //         body: isImage ? data : JSON.stringify({ inputs: data })
// // // // // // //     });

// // // // // // //     const result = await response.json();
// // // // // // //     if (!response.ok) throw new Error(`HF Error: ${JSON.stringify(result)}`);
// // // // // // //     return result;
// // // // // // // }

// // // // // // // // יצירת וקטור מטקסט (לחיפוש)
// // // // // // // export async function generateTextEmbedding(text) {
// // // // // // //     const result = await queryHF(text);
// // // // // // //     return result; 
// // // // // // // }

// // // // // // // // יצירת וקטור מתמונה (לסנכרון)
// // // // // // // export async function generateImageEmbedding(buffer) {
// // // // // // //     // שליחת הבינארי של התמונה ישירות למודל
// // // // // // //     const result = await queryHF(buffer, true);
// // // // // // //     return result;
// // // // // // // }
// // // // // // import fetch from 'node-fetch';
// // // // // // import dotenv from 'dotenv';

// // // // // // dotenv.config();

// // // // // // const HF_TOKEN = process.env.HF_TOKEN;
// // // // // // const IMAGE_MODEL = "openai/clip-vit-base-patch32"; 

// // // // // // async function queryHF(data, isImage = false, retries = 3) {
// // // // // //     const url = `https://api-inference.huggingface.co/models/${IMAGE_MODEL}`;
    
// // // // // //     try {
// // // // // //         const response = await fetch(url, {
// // // // // //             headers: { "Authorization": `Bearer ${HF_TOKEN}` },
// // // // // //             method: "POST",
// // // // // //             body: isImage ? data : JSON.stringify({ inputs: data })
// // // // // //         });

// // // // // //         // בדיקה אם השרת מחזיר HTML במקום JSON
// // // // // //         const contentType = response.headers.get("content-type");
// // // // // //         if (!contentType || !contentType.includes("application/json")) {
// // // // // //             const textError = await response.text();
// // // // // //             if (textError.includes("is currently loading") && retries > 0) {
// // // // // //                 console.log("⏳ המודל בטעינה, מנסה שוב בעוד 10 שניות...");
// // // // // //                 await new Promise(res => setTimeout(res, 10000));
// // // // // //                 return queryHF(data, isImage, retries - 1);
// // // // // //             }
// // // // // //             throw new Error(`HF returned non-JSON response: ${textError.slice(0, 100)}`);
// // // // // //         }

// // // // // //         const result = await response.json();
        
// // // // // //         if (!response.ok) {
// // // // // //             if (result.error && result.error.includes("currently loading") && retries > 0) {
// // // // // //                 console.log("⏳ המודל בטעינה (JSON error), מנסה שוב...");
// // // // // //                 await new Promise(res => setTimeout(res, 15000));
// // // // // //                 return queryHF(data, isImage, retries - 1);
// // // // // //             }
// // // // // //             throw new Error(`HF Error: ${JSON.stringify(result)}`);
// // // // // //         }

// // // // // //         return result;
// // // // // //     } catch (err) {
// // // // // //         if (retries > 0) return queryHF(data, isImage, retries - 1);
// // // // // //         throw err;
// // // // // //     }
// // // // // // }

// // // // // // export async function generateTextEmbedding(text) {
// // // // // //     return await queryHF(text);
// // // // // // }

// // // // // // export async function generateImageEmbedding(buffer) {
// // // // // //     return await queryHF(buffer, true);
// // // // // // }
// // // // // import fetch from 'node-fetch';
// // // // // import dotenv from 'dotenv';

// // // // // dotenv.config();

// // // // // const HF_TOKEN = process.env.HF_TOKEN;
// // // // // // const IMAGE_MODEL = "openai/clip-vit-base-patch32"; 
// // // // // const IMAGE_MODEL = "sentence-transformers/clip-ViT-B-32";
// // // // // async function queryHF(data, isImage = false, retries = 5) {
// // // // //     const url = `https://api-inference.huggingface.co/models/${IMAGE_MODEL}`;
    
// // // // //     try {
// // // // //         const response = await fetch(url, {
// // // // //             headers: { "Authorization": `Bearer ${HF_TOKEN}` },
// // // // //             method: "POST",
// // // // //             body: isImage ? data : JSON.stringify({ inputs: data })
// // // // //         });

// // // // //         const contentType = response.headers.get("content-type");

// // // // //         // אם התגובה היא לא JSON, המודל כנראה בטעינה או שיש שגיאת שרת
// // // // //         if (!contentType || !contentType.includes("application/json")) {
// // // // //             if (retries > 0) {
// // // // //                 console.log(`⏳ המודל מתעורר (התקבל HTML)... מנסה שוב בעוד 10 שניות (נותרו ${retries} ניסיונות)`);
// // // // //                 await new Promise(res => setTimeout(res, 10000));
// // // // //                 return queryHF(data, isImage, retries - 1);
// // // // //             }
// // // // //             throw new Error("HuggingFace keeps returning HTML. Check your Token or Model ID.");
// // // // //         }

// // // // //         const result = await response.json();

// // // // //         // טיפול במצב שהמודל בטעינה (שגיאה 503 מובנית ב-JSON)
// // // // //         if (response.status === 503 || (result.error && result.error.includes("loading"))) {
// // // // //             const waitTime = result.estimated_time ? Math.round(result.estimated_time * 1000) : 10000;
// // // // //             console.log(`⏳ המודל בטעינה. ממתין ${Math.round(waitTime/1000)} שניות...`);
// // // // //             await new Promise(res => setTimeout(res, waitTime));
// // // // //             return queryHF(data, isImage, retries - 1);
// // // // //         }

// // // // //         if (!response.ok) throw new Error(`HF Error: ${JSON.stringify(result)}`);
        
// // // // //         return result;
// // // // //     } catch (err) {
// // // // //         if (retries > 0 && err.message.includes("Unexpected token")) {
// // // // //             console.log("⚠️ שגיאת פענוח (HTML), מנסה שוב בעוד 5 שניות...");
// // // // //             await new Promise(res => setTimeout(res, 5000));
// // // // //             return queryHF(data, isImage, retries - 1);
// // // // //         }
// // // // //         throw err;
// // // // //     }
// // // // // }

// // // // // export async function generateTextEmbedding(text) { return await queryHF(text); }
// // // // // export async function generateImageEmbedding(buffer) { return await queryHF(buffer, true); }
// // // // import fetch from 'node-fetch';
// // // // import dotenv from 'dotenv';

// // // // dotenv.config();

// // // // const HF_TOKEN = process.env.HF_TOKEN;
// // // // // זה המודל הכי אמין ב-HF לחיפוש תמונות (CLIP)
// // // // // const IMAGE_MODEL = "openai/clip-vit-base-patch32"; 
// // // // const IMAGE_MODEL = "sentence-transformers/clip-ViT-B-32";

// // // // // async function queryHF(data, isImage = false, retries = 5) {
// // // // //     const url = `https://api-inference.huggingface.co/models/${IMAGE_MODEL}`;
    
// // // // //     try {
// // // // //         const response = await fetch(url, {
// // // // //             headers: { 
// // // // //                 "Authorization": `Bearer ${HF_TOKEN}`,
// // // // //                 "Content-Type": isImage ? "application/octet-stream" : "application/json"
// // // // //             },
// // // // //             method: "POST",
// // // // //             body: isImage ? data : JSON.stringify({ inputs: data })
// // // // //         });
// // // // async function queryHF(data, isImage = false, retries = 5) {
// // // //     const url = `https://api-inference.huggingface.co/models/${IMAGE_MODEL}`;
    
// // // //     try {
// // // //         const response = await fetch(url, {
// // // //             headers: { 
// // // //                 "Authorization": `Bearer ${HF_TOKEN}`,
// // // //                 // הסרנו את ה-Content-Type הידני לתמונות, תני ל-fetch לטפל בזה או שלחי גוף נקי
// // // //             },
// // // //             method: "POST",
// // // //             body: data // שולח את ה-buffer ישירות
// // // //         });
// // // //         const contentType = response.headers.get("content-type");

// // // //         // אם התגובה היא HTML - נדפיס מה הבעיה
// // // //         if (!contentType || !contentType.includes("application/json")) {
// // // //             const htmlError = await response.text();
// // // //             console.log("--- 🐞 DEBUG: HuggingFace Error ---");
// // // //             console.log("Status:", response.status);
// // // //             console.log("Message Sample:", htmlError.slice(0, 200)); 
            
// // // //             if (htmlError.includes("is currently loading") || response.status === 503) {
// // // //                 console.log(`⏳ המודל בטעינה... מנסה שוב בעוד 15 שניות (נותרו ${retries} ניסיונות)`);
// // // //                 await new Promise(res => setTimeout(res, 15000));
// // // //                 return queryHF(data, isImage, retries - 1);
// // // //             }
// // // //             throw new Error(`HF returned HTML instead of JSON. Check your Token or Model Access.`);
// // // //         }

// // // //         const result = await response.json();

// // // //         // טיפול במצב טעינה בפורמט JSON
// // // //         if (result.error && result.error.includes("loading")) {
// // // //             const waitTime = result.estimated_time ? Math.round(result.estimated_time * 1000) : 15000;
// // // //             console.log(`⏳ המודל מתעורר... ממתין ${Math.round(waitTime/1000)} שניות...`);
// // // //             await new Promise(res => setTimeout(res, waitTime));
// // // //             return queryHF(data, isImage, retries - 1);
// // // //         }

// // // //         if (!response.ok) throw new Error(`HF Error: ${JSON.stringify(result)}`);
        
// // // //         return result;
// // // //     } catch (err) {
// // // //         if (retries > 0) {
// // // //             console.log(`⚠️ ניסיון חוזר עקב שגיאה: ${err.message}`);
// // // //             await new Promise(res => setTimeout(res, 5000));
// // // //             return queryHF(data, isImage, retries - 1);
// // // //         }
// // // //         throw err;
// // // //     }
// // // // }

// // // // export async function generateTextEmbedding(text) { 
// // // //     const result = await queryHF(text);
// // // //     return result; 
// // // // }

// // // // export async function generateImageEmbedding(buffer) { 
// // // //     return await queryHF(buffer, true); 
// // // // }
// // // import { GoogleGenerativeAI } from "@google/generative-ai";
// // // import dotenv from 'dotenv';

// // // dotenv.config();

// // // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // // // גוגל משתמשת במודל text-embedding-004 שמחזיר וקטורים איכותיים מאוד
// // // export async function generateTextEmbedding(text) {
// // //     try {
// // //         const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
// // //         const result = await model.embedContent(text);
// // //         // גוגל מחזירה 768 ממדים, אנחנו נחתוך ל-512 כדי שיתאים ל-DB שלך
// // //         return result.embedding.values.slice(0, 512);
// // //     } catch (err) {
// // //         console.error("❌ Gemini Text Error:", err.message);
// // //         throw err;
// // //     }
// // // }

// // // export async function generateImageEmbedding(buffer) {
// // //     try {
// // //         // לצורך החיפוש, אנחנו נמיר את התמונה לתיאור טקסטואלי ואז לוקטור
// // //         // זו שיטה שעובדת מעולה בנטפרי
// // //         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// // //         const result = await model.generateContent([
// // //             "Describe this image in 5 words for search indexing",
// // //             { inlineData: { data: buffer.toString("base64"), mimeType: "image/jpeg" } }
// // //         ]);
// // //         const description = result.response.text();
// // //         return await generateTextEmbedding(description);
// // //     } catch (err) {
// // //         console.error("❌ Gemini Image Error:", err.message);
// // //         throw err;
// // //     }
// // // }

// // import { HfInference } from "@huggingface/inference";
// // import dotenv from "dotenv";

// // dotenv.config();

// // const hf = new HfInference(process.env.HF_TOKEN);
// // const MODEL_ID = "sentence-transformers/clip-ViT-B-32";

// // export async function generateTextEmbedding(text) {
// //     try {
// //         console.log(`⏳ מייצר וקטור לטקסט: "${text}"`);
// //         const result = await hf.request({
// //             model: MODEL_ID,
// //             inputs: text,
// //         });
// //         console.log(`✅ וקטור טקסט מוכן`);
// //         return result;
// //     } catch (error) {
// //         console.error("❌ שגיאת טקסט:", error.message);
// //         throw error;
// //     }
// // }

// // export async function generateImageEmbedding(buffer) {
// //     try {
// //         console.log(`⏳ מנתח תמונה ב-AI...`);
        
// //         const result = await hf.request({
// //             model: MODEL_ID,
// //             // כאן הקסם: אנחנו שולחים את הבינארי ישירות ב-Body
// //             data: buffer,
// //             header: { "Content-Type": "application/octet-stream" }
// //         });

// //         console.log(`✅ וקטור תמונה מוכן (גודל: ${result.length})`);
// //         return result;
// //     } catch (error) {
// //         console.error("🔍 פירוט תקלה:", error.message);
// //         throw error;
// //     }
// // }
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