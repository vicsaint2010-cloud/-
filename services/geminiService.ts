import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, FaceType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    type: {
      type: Type.STRING,
      enum: [FaceType.EGGEN, FaceType.TETO],
      description: "The primary face shape classification. 'Eggen' for round/oval/smooth. 'Teto' for angular/square/sharp.",
    },
    percentage: {
      type: Type.INTEGER,
      description: "Confidence percentage of the classification (50-100).",
    },
    title: {
      type: Type.STRING,
      description: "A fun, catchy title for the result in Korean (e.g., '매끈한 삶은 달걀', '각이 살아있는 조각상').",
    },
    description: {
      type: Type.STRING,
      description: "A detailed analysis of the face shape features in Korean. Why is it Eggen or Teto?",
    },
    stylingTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-4 hairstyle or accessory tips suitable for this face shape in Korean.",
    },
    celebrityLookalikes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Names of 2-3 celebrities with similar face shapes.",
    },
  },
  required: ["type", "percentage", "title", "description", "stylingTips", "celebrityLookalikes"],
};

export const analyzeFaceImage = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    // Remove header if present (e.g., "data:image/jpeg;base64,")
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64,
            },
          },
          {
            text: `
              Analyze the face shape in this image strictly based on two categories:
              1. "Eggen" (에겐): Smooth, round, oval, soft contours, baby-face characteristics.
              2. "Teto" (테토): Sharp, angular, defined jawline, high cheekbones, square or diamond shape, chic vibes.
              
              Provide the response in Korean. Be witty, fun, and helpful.
            `,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("얼굴을 분석하는 데 실패했습니다. 다시 시도해주세요.");
  }
};
