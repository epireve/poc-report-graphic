import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface SustainabilityDataProps {
  formData: {
    intro: string
    managementRole: string
    orgChart: string
    target: string
    strategicInitiatives: string
    trend: string
    summary: string
  }
  updateFormData: (data: Partial<SustainabilityDataProps['formData']>) => void
}

export function SustainabilityData({ formData, updateFormData }: SustainabilityDataProps) {
  const sections = [
    { id: 'intro', label: 'Introduction', description: 'Provide an overview of your company\'s sustainability approach' },
    { id: 'managementRole', label: 'Management Role', description: 'Describe the role of management in sustainability efforts' },
    { id: 'orgChart', label: 'Organizational Structure', description: 'Outline the structure supporting sustainability initiatives' },
    { id: 'target', label: 'Sustainability Targets', description: 'List your key sustainability targets and goals' },
    { id: 'strategicInitiatives', label: 'Strategic Initiatives', description: 'Detail your main sustainability initiatives' },
    { id: 'trend', label: 'Performance Trends', description: 'Highlight trends in your sustainability performance' },
    { id: 'summary', label: 'Executive Summary', description: 'Summarize key points and future outlook' },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-normal text-gray-800 mb-6">Sustainability Data</h2>
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id}>
            <Label htmlFor={section.id} className="text-base font-medium text-gray-700">{section.label}</Label>
            <p className="text-sm text-gray-500 mb-2">{section.description}</p>
            <Textarea
              id={section.id}
              value={formData[section.id as keyof typeof formData]}
              onChange={(e) => updateFormData({ [section.id]: e.target.value })}
              placeholder={`Enter ${section.label.toLowerCase()}`}
              rows={4}
              className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

