export interface ReportSection {
  id: string;
  title: string;
  content: string;
  layout: 'cover' | 'toc' | 'single-column' | 'two-column';
  pageNumber: number;
}

export interface ReportContent {
  id: string;
  title: string;
  sections: ReportSection[];
} 