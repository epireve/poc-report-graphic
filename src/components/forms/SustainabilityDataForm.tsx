import React, { useEffect, useState } from "react";
import { SustainabilityData } from "@/src/types/form";
import { useMockData } from "@/src/hooks/useMockData";

interface SustainabilityDataFormProps {
  defaultValues?: SustainabilityData;
  onSubmit: (data: SustainabilityData) => void;
}

export const SustainabilityDataForm: React.FC<SustainabilityDataFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  // Get mock data in development
  const mockData = useMockData(2) as SustainabilityData;
  const [formData, setFormData] = useState<SustainabilityData>(
    defaultValues ||
      mockData || {
        introduction: "",
        managementRole: "",
        organizationalStructure: "",
        sustainabilityTargets: "",
        strategicInitiatives: "",
        performanceTrends: "",
        summary: "",
      }
  );

  // Update form data when mock data changes
  useEffect(() => {
    if (mockData) {
      setFormData(mockData);
    }
  }, [mockData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      id="sustainability-data-form"
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-semibold mb-6">Sustainability Data</h2>
        <p className="text-gray-600">
          Input your sustainability initiatives and metrics
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="introduction"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Introduction
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Provide an overview of your company's sustainability approach
          </p>
          <textarea
            id="introduction"
            rows={4}
            value={formData.introduction}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter introduction"
            required
          />
        </div>

        <div>
          <label
            htmlFor="managementRole"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Management Role
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Describe the role of management in sustainability efforts
          </p>
          <textarea
            id="managementRole"
            rows={4}
            value={formData.managementRole}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter management role"
            required
          />
        </div>

        <div>
          <label
            htmlFor="organizationalStructure"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Organizational Structure
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Outline the structure supporting sustainability initiatives
          </p>
          <textarea
            id="organizationalStructure"
            rows={4}
            value={formData.organizationalStructure}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter organizational structure"
            required
          />
        </div>

        <div>
          <label
            htmlFor="sustainabilityTargets"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sustainability Targets
          </label>
          <p className="text-sm text-gray-500 mb-2">
            List your key sustainability targets and goals
          </p>
          <textarea
            id="sustainabilityTargets"
            rows={6}
            value={formData.sustainabilityTargets}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter sustainability targets"
            required
          />
        </div>

        <div>
          <label
            htmlFor="strategicInitiatives"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Strategic Initiatives
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Detail your main sustainability initiatives
          </p>
          <textarea
            id="strategicInitiatives"
            rows={6}
            value={formData.strategicInitiatives}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter strategic initiatives"
            required
          />
        </div>

        <div>
          <label
            htmlFor="performanceTrends"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Performance Trends
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Highlight trends in your sustainability performance
          </p>
          <textarea
            id="performanceTrends"
            rows={6}
            value={formData.performanceTrends}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter performance trends"
            required
          />
        </div>

        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Executive Summary
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Provide a concise summary of your sustainability efforts
          </p>
          <textarea
            id="summary"
            rows={6}
            value={formData.summary}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter executive summary"
            required
          />
        </div>
      </div>
    </form>
  );
};
