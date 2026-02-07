import fs from "fs";
import path from "path";
import { downloadFile } from "../services/drive.service.js";
import { generateImageEmbedding } from "../services/embeddingService.js";

const DB_PATH = path.resolve("db.json");

async function run() {
    if (!fs.existsSync(DB_PATH)) return console.log("❌ No db.json found");
    const images = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

    const toProcess = images.filter(img => !img.embedding || img.embedding.length === 0);
    console.log(`⏳ Processing ${toProcess.length} images...`);

    for (const img of toProcess) {
        try {
            console.log(`🧠 Embedding: ${img.name}`);
            const buffer = await downloadFile(img.id);
            img.embedding = await generateImageEmbedding(buffer);
            
            // שמירה מיידית למקרה של תקלה
            fs.writeFileSync(DB_PATH, JSON.stringify(images, null, 2));
            console.log(`✅ Done: ${img.name}`);
        } catch (err) {
            console.error(`❌ Error ${img.name}:`, err.message);
        }
    }
    console.log("✨ All images processed!");
}

run();