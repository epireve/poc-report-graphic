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
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompanyProfileSubmit = (data: FormState["companyProfile"]) => {
    setFormData((prev) => ({ ...prev, companyProfile: data }));
    setCurrentStep(2);
  };

  const handleSustainabilityDataSubmit = async (
    data: FormState["sustainabilityData"]
  ) => {
    const updatedFormData = { ...formData, sustainabilityData: data };
    setFormData(updatedFormData);
    setCurrentStep(3);
  };

  const handleGeneratePreview = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      console.log("Generating PDF with form data:", formData);
      const url = await generatePDF(formData);
      console.log("PDF generated successfully, URL:", url);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
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

  // Cleanup PDF URL when component unmounts or when generating new PDF
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  // Reset error when changing steps
  useEffect(() => {
    setError(null);
  }, [currentStep]);

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

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold">Preview Report</h2>
                      <p className="text-gray-600">
                        Generate a preview, review your report, and download the
                        final PDF
                      </p>
                    </div>
                    <div className="flex gap-4">
                      {pdfUrl && (
                        <button
                          onClick={handleDownload}
                          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          Download PDF
                        </button>
                      )}
                      <button
                        onClick={handleGeneratePreview}
                        disabled={isGenerating}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Generating...
                          </>
                        ) : (
                          "Generate Preview"
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
                      {error}
                    </div>
                  )}

                  {pdfUrl ? (
                    <PDFPreview pdfUrl={pdfUrl} />
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-12 text-center">
                      <div className="mb-4">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No preview available
                      </h3>
                      <p className="text-gray-500">
                        Click the "Generate Preview" button above to create a
                        preview of your report
                      </p>
                    </div>
                  )}
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
                {currentStep < 3 && (
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
