import { ReportPreview } from "@/src/components/ReportPreview";
import { mockReportData } from "@/src/mocks/reportData";
import { ReportContent } from "@/src/types/report";

export default function PreviewPage() {
  // Using mock data for development
  const report: ReportContent = {
    id: "1",
    title: "Sustainability Report 2024",
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
        content: `Our commitment to sustainability has driven significant progress in 2024. 
        We've implemented innovative solutions to reduce our environmental impact while 
        maintaining strong business growth. This report outlines our achievements and 
        future commitments to sustainable development.`,
        layout: "single-column",
        pageNumber: 3,
      },
      {
        id: "environmental-impact",
        title: "Environmental Impact",
        content: `Carbon Footprint:
        • Reduced CO2 emissions by 30% compared to 2023
        • Implemented renewable energy across 80% of operations
        • Achieved carbon neutrality in 5 major facilities
        
        Waste Management:
        • Zero waste to landfill in 60% of facilities
        • Recycled 85% of total waste generated
        • Reduced plastic usage by 45%
        
        Water Conservation:
        • Decreased water consumption by 25%
        • Implemented water recycling in all manufacturing plants
        • Zero water discharge in 3 major facilities`,
        layout: "two-column",
        pageNumber: 4,
      },
      {
        id: "social-responsibility",
        title: "Social Responsibility",
        content: `Community Engagement:
        • Invested $10M in local community projects
        • Supported 50 educational initiatives
        • Created 1000+ jobs in underserved areas
        
        Employee Welfare:
        • Achieved 40% gender diversity in leadership
        • Zero workplace accidents for 365 days
        • Implemented comprehensive mental health program
        
        Supply Chain Ethics:
        • 100% suppliers audited for ethical practices
        • Fair trade certification achieved
        • Local sourcing increased to 60%`,
        layout: "two-column",
        pageNumber: 5,
      },
      {
        id: "future-commitments",
        title: "Future Commitments",
        content: `2025 Goals:
        • Achieve 50% reduction in carbon emissions
        • 100% renewable energy usage
        • Zero waste across all operations
        • Full supply chain transparency
        • 50% gender diversity at all levels
        
        Long-term Vision:
        • Carbon negative by 2030
        • Industry leader in sustainable practices
        • Complete circular economy model
        • 100% sustainable product portfolio`,
        layout: "single-column",
        pageNumber: 6,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ReportPreview report={report} />
    </div>
  );
}
