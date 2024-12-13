import React, { useEffect, useState } from "react";
import { CompanyProfile } from "@/src/types/form";
import { useMockData } from "@/src/hooks/useMockData";

interface CompanyProfileFormProps {
  defaultValues?: CompanyProfile;
  onSubmit: (data: CompanyProfile) => void;
}

export const CompanyProfileForm: React.FC<CompanyProfileFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  // Get mock data in development
  const mockData = useMockData(1) as CompanyProfile;
  const [formData, setFormData] = useState<CompanyProfile>(
    defaultValues ||
      mockData || {
        companyName: "",
        reportTitle: "",
        reportDate: "",
        companyLogo: null,
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
      id="company-profile-form"
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-semibold mb-6">Company Profile</h2>
        <p className="text-gray-600">
          Enter your company details and report basics
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your company name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="reportTitle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Report Title
          </label>
          <input
            type="text"
            id="reportTitle"
            value={formData.reportTitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter report title"
            required
          />
        </div>

        <div>
          <label
            htmlFor="reportDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Report Date
          </label>
          <input
            type="date"
            id="reportDate"
            value={formData.reportDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="companyLogo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company Logo
          </label>
          <input
            type="file"
            id="companyLogo"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setFormData((prev) => ({
                ...prev,
                companyLogo: file,
              }));
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </form>
  );
};
