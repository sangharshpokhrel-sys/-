import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface BlogArticle {
  title: string;
  content: string;
  keywords: string[];
}

export const generateBlogArticle = async (
  topic: string,
  keywords: string,
  language: string,
  tone: string
): Promise<BlogArticle> => {
  const prompt = `Generate a spiritual blog article about "${topic}".
  Keywords to include: ${keywords}.
  Language: ${language}.
  Tone: ${tone}.
  
  Provide the output in JSON format with "title", "content" (markdown), and "keywords" (array).
  The content should be high-quality, engaging, and spiritually insightful.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "content", "keywords"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result as BlogArticle;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate blog article. Please try again.");
  }
};
