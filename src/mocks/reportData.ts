import { ReportContent } from "../types/report";

export const mockReportData: ReportContent = {
  id: "1",
  title: "Annual Company Performance Report 2024",
  sections: [
    {
      id: "cover",
      title: "Cover",
      content: "",
      layout: "cover",
      pageNumber: 1,
    },
    {
      id: "toc",
      title: "Table of Contents",
      content: "",
      layout: "toc",
      pageNumber: 2,
    },
    {
      id: "executive-summary",
      title: "Executive Summary",
      content: `Our company has demonstrated remarkable growth and resilience throughout 2024. 
      Key achievements include expanding our market presence, launching innovative products, and strengthening our operational efficiency. This report provides a comprehensive overview of our performance, strategies, and future outlook.`,
      layout: "single-column",
      pageNumber: 3,
    },
    {
      id: "financial-highlights",
      title: "Financial Highlights",
      content: `Revenue Growth: Our revenue increased by 25% compared to the previous year, 
      reaching $150 million. This growth was driven by strong performance across all business segments.
      
      Profitability: Operating margin improved to 18%, up from 15% in the previous year, 
      reflecting our continued focus on operational efficiency and cost management.
      
      Market Expansion: We successfully entered three new markets, establishing a strong 
      presence in key regions and diversifying our revenue streams.`,
      layout: "two-column",
      pageNumber: 4,
    },
    {
      id: "operational-overview",
      title: "Operational Overview",
      content: `Product Development: Launched 5 new products, expanding our portfolio and 
      addressing emerging market needs. Our R&D investments increased by 30%.
      
      Customer Base: Grew our customer base by 40%, with particularly strong growth in 
      the enterprise segment. Customer satisfaction scores improved to 4.8/5.
      
      Digital Transformation: Completed major digital initiatives, including the implementation 
      of AI-driven analytics and automation of key processes.`,
      layout: "single-column",
      pageNumber: 5,
    },
    {
      id: "future-outlook",
      title: "Future Outlook",
      content: `Strategic Priorities:
      - Accelerate digital transformation initiatives
      - Expand international presence
      - Enhance product portfolio through innovation
      - Strengthen sustainability practices
      
      Market Opportunities:
      - Growing demand in emerging markets
      - Increasing adoption of digital solutions
      - Rising focus on sustainable products
      
      Investment Plans:
      - Increase R&D spending by 25%
      - Expand manufacturing capacity
      - Strengthen digital infrastructure`,
      layout: "two-column",
      pageNumber: 6,
    }
  ],
}; 