import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface EnterContentProps {
  formData: {
    intro: string
    managementRole: string
    orgChart: string
    target: string
    strategicInitiatives: string
    trend: string
    summary: string
  }
  updateFormData: (data: Partial<EnterContentProps['formData']>) => void
}

export function EnterContent({ formData, updateFormData }: EnterContentProps) {
  const sections = [
    { id: 'intro', label: 'Introduction' },
    { id: 'managementRole', label: 'Management Role' },
    { id: 'orgChart', label: 'Organizational Chart' },
    { id: 'target', label: 'Target' },
    { id: 'strategicInitiatives', label: 'Strategic Initiatives' },
    { id: 'trend', label: 'Trend' },
    { id: 'summary', label: 'Summary' },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-emerald-700 mb-6">Enter Content</h2>
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id}>
            <Label htmlFor={section.id}>{section.label}</Label>
            <Textarea
              id={section.id}
              value={formData[section.id as keyof typeof formData]}
              onChange={(e) => updateFormData({ [section.id]: e.target.value })}
              placeholder={`Enter ${section.label.toLowerCase()}`}
              rows={4}
              className="border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

