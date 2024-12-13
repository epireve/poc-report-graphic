import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface PreviewDownloadProps {
  formData: {
    title: string
    date: string
    logo: File | null
    intro: string
    managementRole: string
    orgChart: string
    target: string
    strategicInitiatives: string
    trend: string
    summary: string
  }
}

export function PreviewDownload({ formData }: PreviewDownloadProps) {
  const handleDownload = () => {
    // Here you would generate and download the PDF
    console.log('Downloading PDF...')
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-emerald-700 mb-6">Preview & Download</h2>
      <ScrollArea className="h-[60vh] border border-emerald-200 rounded-md p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{formData.title}</h3>
          <p>Date: {new Date(formData.date).toLocaleDateString()}</p>
          {formData.logo && <img src={URL.createObjectURL(formData.logo)} alt="Logo" className="max-w-xs" />}
          <h4 className="text-lg font-semibold">Introduction</h4>
          <p>{formData.intro}</p>
          <h4 className="text-lg font-semibold">Management Role</h4>
          <p>{formData.managementRole}</p>
          <h4 className="text-lg font-semibold">Organizational Chart</h4>
          <p>{formData.orgChart}</p>
          <h4 className="text-lg font-semibold">Target</h4>
          <p>{formData.target}</p>
          <h4 className="text-lg font-semibold">Strategic Initiatives</h4>
          <p>{formData.strategicInitiatives}</p>
          <h4 className="text-lg font-semibold">Trend</h4>
          <p>{formData.trend}</p>
          <h4 className="text-lg font-semibold">Summary</h4>
          <p>{formData.summary}</p>
        </div>
      </ScrollArea>
      <Button onClick={handleDownload} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">Download PDF</Button>
    </div>
  )
}

