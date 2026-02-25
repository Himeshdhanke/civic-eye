import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini API
if (!process.env.GEMINI_API_KEY) {
    console.error("CRITICAL: GEMINI_API_KEY is missing from environment variables!");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
console.log("Gemini model initialized: gemini-2.5-flash");

app.post("/api/categorize", async (req, res) => {
    console.log("Categorize Request Body:", req.body);
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ error: "Description is required" });
    }

    try {
        const prompt = `
You are a civic issue classification system.

Return ONLY valid JSON:
{
  "category": "Road | Garbage | Drainage | Lighting | Sanitation",
  "department": "String",
  "priority": "Low | Medium | High",
  "formatted_title": "Short descriptive title"
}

Issue:
${description}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(text);
        } catch {
            const cleanedText = text.replace(/```json|```/g, "").trim();
            parsedResponse = JSON.parse(cleanedText);
        }

        res.json(parsedResponse);
    } catch (error) {
        console.error("Gemini Backend Error:", error.message);
        res.status(500).json({ error: "Failed to categorize issue" });
    }
});

app.get("/api/config", (req, res) => {
    res.json({
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
        n8nWebhookUrl: process.env.N8N_WEBHOOK_URL
    });
});

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

// Export the app for Vercel
export default app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running locally on port ${port}`);
    });
}
