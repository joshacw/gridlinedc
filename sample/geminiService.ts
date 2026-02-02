
import { GoogleGenAI, Type } from "@google/genai";

export const getMarketInsights = async (topic: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const prompt = `Act as a senior data center investment analyst for GridlineDC. 
  Provide a detailed market analysis for the following topic: "${topic}". 
  Include current trends, institutional demand (especially for AI), and how this affects the path to a public listing.
  Format the response as a structured analysis.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            keyMetrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING }
                },
                required: ["label", "value"]
              }
            },
            recommendation: { type: Type.STRING }
          },
          required: ["analysis", "keyMetrics", "recommendation"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching insights:", error);
    throw error;
  }
};
