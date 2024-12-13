import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

interface ReviewAndGenerateProps {
  formData: {
    companyName: string;
    title: string;
    date: string;
    logo: File | null;
    intro: string;
    managementRole: string;
    orgChart: string;
    target: string;
    strategicInitiatives: string;
    trend: string;
    summary: string;
  };
}

export function ReviewAndGenerate({ formData }: ReviewAndGenerateProps) {
  const handleDownload = () => {
    console.log("Generating and downloading PDF...");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-normal text-gray-800 mb-6">
        Review and Generate Report
      </h2>
      <ScrollArea className="h-[60vh] border border-gray-200 rounded-md p-6">
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-800">
            {formData.title}
          </h3>
          <p className="text-gray-600">Company: {formData.companyName}</p>
          <p className="text-gray-600">
            Date: {new Date(formData.date).toLocaleDateString()}
          </p>
          {formData.logo && (
            <div className="relative w-64 h-32 my-4">
              <Image
                src={URL.createObjectURL(formData.logo)}
                alt="Company Logo"
                fill
                className="object-contain"
              />
            </div>
          )}
          <h4 className="text-lg font-medium text-gray-700 mt-6">
            Executive Summary
          </h4>
          <p className="text-gray-600">{formData.summary}</p>
          <h4 className="text-lg font-medium text-gray-700 mt-6">
            Introduction
          </h4>
          <p className="text-gray-600">{formData.intro}</p>
          <h4 className="text-lg font-medium text-gray-700 mt-6">
            Management Role in Sustainability
          </h4>
          <p className="text-gray-600">{formData.managementRole}</p>
          <h4 className="text-lg font-medium text-gray-700 mt-6">
            Organizational Structure
          </h4>
          <p className="text-gray-600">{formData.orgChart}</p>
          <h4 className="text-lg font-medium text-gray-700 mt-6">
            Sustainability Targets
          </h4>
          <p className="text-gray-600">{formData.target}</p>
          <h4 className="text-lg font-medium text-gray-700 mt-6">
            Strategic Initiatives
          </h4>
          <p className="text-gray-600">{formData.strategicInitiatives}</p>
          <h4 className="text-lg font-medium text-gray-700 mt-6">
            Performance Trends
          </h4>
          <p className="text-gray-600">{formData.trend}</p>
        </div>
      </ScrollArea>
      <Button
        onClick={handleDownload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 rounded-md"
      >
        Generate and Download PDF
      </Button>
    </div>
  );
}
