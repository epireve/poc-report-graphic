"use client";

import { CompanyProfileForm } from "@/src/components/forms/CompanyProfileForm";
import { PDFPreview } from "@/src/components/PDFPreview";
import { SustainabilityDataForm } from "@/src/components/forms/SustainabilityDataForm";
import { FormState } from "@/src/types/form";
import { generatePDF } from "@/src/utils/pdfGenerator";
import { useState, useEffect } from "react";

export default function Home() {
  const [formData, setFormData] = useState<FormState>({
    companyProfile: {
      companyName: "",
      reportTitle: "",
      reportDate: "",
      companyLogo: null,
    },
    sustainabilityData: {
      introduction: "",
      managementRole: "",
      organizationalStructure: "",
      sustainabilityTargets: "",
      strategicInitiatives: "",
      performanceTrends: "",
      summary: "",
    },
  });

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleCompanyProfileSubmit = (data: FormState["companyProfile"]) => {
    setFormData((prev) => ({ ...prev, companyProfile: data }));
    setCurrentStep(2);
  };

  const handleSustainabilityDataSubmit = async (
    data: FormState["sustainabilityData"]
  ) => {
    const updatedFormData = { ...formData, sustainabilityData: data };
    setFormData(updatedFormData);

    try {
      // Generate PDF and get the local URL
      const url = await generatePDF(updatedFormData);
      setPdfUrl(url);
      setCurrentStep(3);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${
        formData.companyProfile.reportTitle || "sustainability-report"
      }.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Cleanup PDF URL when component unmounts
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const steps = [
    {
      number: 1,
      title: "Company Profile",
      description: "Enter your company details and report basics",
    },
    {
      number: 2,
      title: "Sustainability Data",
      description: "Input your sustainability initiatives and metrics",
    },
    {
      number: 3,
      title: "Preview and Download",
      description: "Review your report and download the PDF",
    },
  ];

  return (
    <>
      <header className="py-4 bg-white border-b">
        <div className="container mx-auto">
          <h1 className="text-xl font-medium text-gray-800">
            Sustainability Report Generator
          </h1>
        </div>
      </header>

      <div className="container px-4 py-8 mx-auto">
        <div className="flex gap-12">
          {/* Left sidebar with steps */}
          <div className="w-1/4">
            <div className="sticky top-8">
              <div className="space-y-6">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`flex items-start gap-4 ${
                      currentStep === step.number
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        currentStep === step.number
                          ? "border-blue-600 bg-blue-600 text-white"
                          : currentStep > step.number
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        step.number
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{step.title}</div>
                      <div className="text-sm text-gray-500">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="w-3/4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {currentStep === 1 && (
                <CompanyProfileForm
                  defaultValues={formData.companyProfile}
                  onSubmit={handleCompanyProfileSubmit}
                />
              )}

              {currentStep === 2 && (
                <SustainabilityDataForm
                  defaultValues={formData.sustainabilityData}
                  onSubmit={handleSustainabilityDataSubmit}
                />
              )}

              {currentStep === 3 && pdfUrl && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold">Preview Report</h2>
                      <p className="text-gray-600">
                        Review your report and download the final PDF
                      </p>
                    </div>
                  </div>
                  <PDFPreview pdfUrl={pdfUrl} />
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                {currentStep === 3 ? (
                  <button
                    onClick={handleDownload}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Download PDF
                  </button>
                ) : (
                  <button
                    type="submit"
                    form={
                      currentStep === 1
                        ? "company-profile-form"
                        : "sustainability-data-form"
                    }
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
