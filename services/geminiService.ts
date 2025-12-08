
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    // Use process.env.API_KEY as required
    // Ensure we don't throw immediately if key is missing during init, but handled in call
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API_KEY is missing");
    }
    aiClient = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-to-prevent-crash' });
  }
  return aiClient;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Create chat session
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history.map(h => ({
            role: h.role,
            parts: [{ text: h.text }]
        }))
    });

    const response = await chat.sendMessage({ message });
    
    return response.text || "Извините, я сейчас любуюсь горами и не могу ответить. Попробуйте позже.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // More user-friendly error message, not "database" error
    return "Простите, сейчас плохая связь с горами. Пожалуйста, попробуйте задать вопрос через минуту.";
  }
};
