export enum FaceType {
  EGGEN = 'Eggen',
  TETO = 'Teto',
  UNKNOWN = 'Unknown'
}

export interface AnalysisResult {
  type: FaceType;
  percentage: number; // 0 to 100 representing confidence or degree
  title: string;
  description: string;
  stylingTips: string[];
  celebrityLookalikes: string[];
}
