export interface ColorInfo {
  hex: string;
  name: string;
  prominence: number;
}

export interface FontInfo {
  fontFamily: string;
  fontWeight: string;
  exampleText: string;
}

export interface UIComponentInfo {
  name: string;
  description: string;
  svgIcon: string;
  designInsight: string;
}

export interface ComponentNode {
  name: string;
  svgIcon: string;
  children: ComponentNode[];
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
  componentTree: ComponentNode;
}