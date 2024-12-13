import { mockCompanyProfile, mockSustainabilityData } from "../mocks/formData";

export const useMockData = (step: number) => {
  // Only use mock data in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  switch (step) {
    case 1:
      return mockCompanyProfile;
    case 2:
      return mockSustainabilityData;
    default:
      return null;
  }
}; 