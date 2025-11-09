import { GoogleGenAI } from "@google/genai";
import type { AnalysisReport } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are a world-class senior product designer and UI/UX expert. Your task is to analyze a given website URL and provide a comprehensive, structured breakdown of its product design. Your response MUST be a single, valid JSON object and nothing else. Do not wrap it in markdown (e.g. \`\`\`json) or add any commentary. The JSON object must contain keys for 'overview', 'colorPalette', 'typography', 'layout', 'uiComponents', 'uxAnalysis', and 'componentTree'. For each color, estimate its prominence on the page as a percentage (0-100). For each UI component, you must provide a 'description' (its function) and a 'designInsight' (actionable feedback on its design, usability, or accessibility, suggesting improvements or best practices). Also generate a detailed, professional-quality, single-color SVG line icon that visually represents the component (e.g., for a 'Search Bar', an SVG of a magnifying glass). The SVG must use 'currentColor' for its stroke/fill, have a viewBox='0 0 24 24', and must not include fixed width/height attributes to ensure it's scalable. The 'componentTree' key should contain a nested object representing the high-level component hierarchy (e.g., Root > Header > [Logo, Navigation]). Each node in the tree must have 'name', 'svgIcon', and 'children' properties. Be professional, insightful, and constructive.`;

export const analyzeUrlWithGemini = async (url: string): Promise<AnalysisReport> => {
  try {
    const prompt = `Please analyze the product design of the following website: ${url}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{googleSearch: {}}],
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