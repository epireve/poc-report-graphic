export interface CompanyProfile {
  companyName: string;
  reportTitle: string;
  reportDate: string;
  companyLogo: File | null;
}

export interface SustainabilityData {
  introduction: string;
  managementRole: string;
  organizationalStructure: string;
  sustainabilityTargets: string;
  strategicInitiatives: string;
  performanceTrends: string;
  summary: string;
}

export interface FormState {
  companyProfile: CompanyProfile;
  sustainabilityData: SustainabilityData;
} 