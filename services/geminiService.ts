import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Fail gracefully if no key
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateAIResponse = async (
  prompt: string, 
  context: string = "You are a cool, energetic social media assistant named Solaris AI. Keep responses short, fun, and using emojis."
): Promise<string> => {
  if (!ai) {
    return "⚠️ Configuração de API necessária para o Solaris AI.";
  }

  try {
    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${context} User says: ${prompt}` }]
        }
      ]
    });
    
    return response.text || "Não consegui pensar em nada agora! 🤯";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ops! Tive um problema técnico. Tente novamente mais tarde.";
  }
};
