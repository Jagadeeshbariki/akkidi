
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProductDescription = async (name: string, category: string): Promise<string> => {
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
