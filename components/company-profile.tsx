import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

interface CompanyProfileProps {
  formData: {
    companyName: string
    title: string
    date: string
    logo: File | null
  }
  updateFormData: (data: Partial<CompanyProfileProps['formData']>) => void
}

export function CompanyProfile({ formData, updateFormData }: CompanyProfileProps) {
  const [date, setDate] = useState<Date | undefined>(formData.date ? new Date(formData.date) : undefined)

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-normal text-gray-800 mb-6">Company Profile</h2>
      <div className="space-y-6">
        <div>
          <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => updateFormData({ companyName: e.target.value })}
            placeholder="Enter your company name"
            className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
          />
        </div>
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">Report Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            placeholder="Enter report title"
            className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700">Report Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50 hover:text-gray-900 mt-1 rounded-md">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate)
                  updateFormData({ date: newDate ? newDate.toISOString() : '' })
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="logo" className="text-sm font-medium text-gray-700">Company Logo</Label>
          <Input
            id="logo"
            type="file"
            accept="image/*"
            onChange={(e) => updateFormData({ logo: e.target.files ? e.target.files[0] : null })}
            className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
          />
        </div>
      </div>
    </div>
  )
}

