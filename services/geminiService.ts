import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisReport } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are a world-class senior product designer and UI/UX expert. Your task is to analyze a given website URL and provide a comprehensive, structured breakdown of its product design in a strict JSON format that adheres to the provided schema. Do not include any markdown formatting or explanatory text outside of the JSON structure. Be professional, insightful, and constructive.`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        overview: { type: Type.STRING, description: 'A one-paragraph overview of the site\'s design philosophy.' },
        colorPalette: {
            type: Type.OBJECT,
            properties: {
                primary: { type: Type.ARRAY, description: "Primary brand colors.", items: { type: Type.OBJECT, properties: { hex: { type: Type.STRING }, name: { type: Type.STRING } }, required: ['hex', 'name'] } },
                secondary: { type: Type.ARRAY, description: "Secondary brand colors.", items: { type: Type.OBJECT, properties: { hex: { type: Type.STRING }, name: { type: Type.STRING } }, required: ['hex', 'name'] } },
                accent: { type: Type.ARRAY, description: "Accent colors for CTAs or highlights.", items: { type: Type.OBJECT, properties: { hex: { type: Type.STRING }, name: { type: Type.STRING } }, required: ['hex', 'name'] } }
            },
            required: ['primary', 'secondary', 'accent']
        },
        typography: {
            type: Type.OBJECT,
            properties: {
                heading: { type: Type.OBJECT, properties: { fontFamily: { type: Type.STRING }, fontWeight: { type: Type.STRING }, exampleText: { type: Type.STRING, description: "Example text for a heading." } }, required: ['fontFamily', 'fontWeight', 'exampleText'] },
                body: { type: Type.OBJECT, properties: { fontFamily: { type: Type.STRING }, fontWeight: { type: Type.STRING }, exampleText: { type: Type.STRING, description: "Example text for body copy." } }, required: ['fontFamily', 'fontWeight', 'exampleText'] }
            },
            required: ['heading', 'body']
        },
        layout: {
            type: Type.OBJECT,
            properties: {
                type: { type: Type.STRING, description: "e.g., Grid-based, Minimalist, Single-column" },
                description: { type: Type.STRING, description: "A brief description of the layout and information architecture." }
            },
            required: ['type', 'description']
        },
        uiComponents: {
            type: Type.ARRAY,
            description: "List of 3-5 notable UI components.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "e.g., Primary Button, Navigation Bar" },
                    description: { type: Type.STRING, description: "Brief analysis of the component's design." }
                },
                required: ['name', 'description']
            }
        },
        uxAnalysis: {
            type: Type.OBJECT,
            properties: {
                strengths: { type: Type.ARRAY, description: "Bulleted list of 3-5 key design strengths.", items: { type: Type.STRING } },
                improvements: { type: Type.ARRAY, description: "Bulleted list of 3-5 potential areas for improvement.", items: { type: Type.STRING } }
            },
            required: ['strengths', 'improvements']
        }
    },
    required: ['overview', 'colorPalette', 'typography', 'layout', 'uiComponents', 'uxAnalysis']
};


export const analyzeUrlWithGemini = async (url: string): Promise<AnalysisReport> => {
  try {
    const prompt = `Please analyze the product design of the following website: ${url}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{googleSearch: {}}],
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    // In case the model wraps the JSON in markdown
    const cleanedJson = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    return JSON.parse(cleanedJson) as AnalysisReport;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to analyze URL: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the Gemini API.");
  }
};
