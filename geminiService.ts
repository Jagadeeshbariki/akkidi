
import { GoogleGenAI } from "@google/genai";

// Safely access process.env to prevent ReferenceError in browser environments
const getApiKey = (): string => {
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
    return '';
  } catch (e) {
    return '';
  }
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const generateProductDescription = async (name: string, category: string): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API key is not available. Using default description.");
    return "Freshly produced by local farmers with love and care.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a 2-sentence marketing description for an agricultural product named "${name}" in the "${category}" category. Focus on health, freshness, and supporting local farmers.`,
      config: {
        maxOutputTokens: 100,
      }
    });
    return response.text || "Freshly produced by local farmers with love and care.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "High-quality produce from our local farmer community.";
  }
};
