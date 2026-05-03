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

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export const spiritualChat = async (history: ChatMessage[], message: string, language: string) => {
  const systemInstruction = `You are a wise and compassionate spiritual Guru and Vedic scholar. 
  Your goal is to provide guidance, explain rituals, and offer spiritual insights based on Vedic traditions, Sanatan Dharma, and general spirituality. 
  Always be respectful, humble, and uplifting. 
  Current user language: ${language}. Please respond primarily in ${language}, but you can use Sanskrit verses (Shlokas) with meanings when appropriate.
  If asked about non-spiritual topics, gently guide the conversation back to spiritual or cultural aspects while still being helpful.`;

  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction,
      },
      history: history,
    });

    const response = await chat.sendMessage({
      message: message,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw new Error("I am currently in deep meditation (offline). Please try again later.");
  }
};
