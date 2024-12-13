"use client";

import { useState } from "react";
import { CompanyProfile } from "@/components/company-profile";
import { SustainabilityData } from "@/components/sustainability-data";
import { ReviewAndGenerate } from "@/components/review-and-generate";
import { Button } from "@/components/ui/button";
import { VerticalStepIndicator } from "@/components/vertical-step-indicator";

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    date: "",
    logo: null,
    intro: "",
    managementRole: "",
    orgChart: "",
    target: "",
    strategicInitiatives: "",
    trend: "",
    summary: "",
  });

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Submitting data:", formData);
  };

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
      title: "Review and Generate",
      description: "Preview your report and generate the final PDF",
    },
  ];

  return (
    <>
      <header className="py-4 bg-white border-b">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-xl font-medium text-gray-800">
            Sustainability Report Generator
          </h1>
        </div>
      </header>
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="flex gap-12">
          <div className="w-1/4">
            <div className="sticky top-8">
              <VerticalStepIndicator steps={steps} currentStep={step} />
            </div>
          </div>
          <div className="w-3/4">
            <div className="p-8 bg-white rounded-lg shadow-md">
              {step === 1 && (
                <CompanyProfile
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}
              {step === 2 && (
                <SustainabilityData
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}
              {step === 3 && <ReviewAndGenerate formData={formData} />}
              <div className="flex justify-between mt-12">
                <Button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-6 py-2 text-blue-600 transition-colors duration-300 bg-white border border-blue-600 rounded-md hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-white"
                >
                  Back
                </Button>
                {step < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="px-6 py-2 text-white transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="px-6 py-2 text-white transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Generate Report
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
