import { mockCompanyProfile, mockSustainabilityData } from "../mocks/formData";

export const useMockData = (step: number) => {
  // Use mock data if NEXT_PUBLIC_USE_MOCK_DATA is set to "true"
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "true") {
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