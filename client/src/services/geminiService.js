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
export const refineTranscript = async (text) => {
  if (!text || text.length < 10) return text;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
            You are a multi-lingual civic assistant expert in Indian languages (English, Hindi, Marathi).
            The input text is a rough voice-to-text transcript. 
            
            YOUR GOAL:
            1. Detect if the language is English, Hindi, Marathi, or a mix (Hinglish/Marathish).
            2. Clean the grammar, punctuation, and structure.
            3. If it's phonetically written local language (e.g., "sadak pe kachra hai" or "rastyavar kachra ahe"), translate it to a professional, formal Civic Complaint in English.
            4. If it's already in formal local language, refine its grammar and provide the English translation for the official report.
            
            Return ONLY the final, polished, and professional English version of the complaint.
            
            Input Text: "${text}"
        `;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Refinement Error:", error);
    return text;
  }
};
