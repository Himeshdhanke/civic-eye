import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const categorizeIssue = async (description) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `
      Categorize this civic issue into: [Road, Garbage, Drainage, Lighting, Sanitation].
      Return ONLY a JSON object in this format:
      {
        "category": "String",
        "department": "String",
        "priority": "Low | Medium | High",
        "formatted_title": "Short descriptive title"
      }
      Issue description: "${description}"
    `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        return JSON.parse(text.replace(/```json|```/g, ""));
    } catch (error) {
        console.error("Gemini Categorization Error:", error);
        return null;
    }
};
