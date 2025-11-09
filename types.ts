export interface ColorInfo {
  hex: string;
  name: string;
}

export interface FontInfo {
  fontFamily: string;
  fontWeight: string;
  exampleText: string;
}

export interface UIComponentInfo {
  name: string;
  description: string;
}

export interface AnalysisReport {
  overview: string;
  colorPalette: {
    primary: ColorInfo[];
    secondary: ColorInfo[];
    accent: ColorInfo[];
  };
  typography: {
    heading: FontInfo;
    body: FontInfo;
  };
  layout: {
    type: string;
    description: string;
  };
  uiComponents: UIComponentInfo[];
  uxAnalysis: {
    strengths: string[];
    improvements: string[];
  };
}
