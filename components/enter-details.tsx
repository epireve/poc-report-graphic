import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

interface EnterDetailsProps {
  formData: {
    title: string
    date: string
    logo: File | null
  }
  updateFormData: (data: Partial<EnterDetailsProps['formData']>) => void
}

export function EnterDetails({ formData, updateFormData }: EnterDetailsProps) {
  const [date, setDate] = useState<Date | undefined>(formData.date ? new Date(formData.date) : undefined)

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-emerald-700 mb-6">Enter Details</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Report Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            placeholder="Enter report title"
            className="border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <Label>Report Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
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
          <Label htmlFor="logo">Logo Upload</Label>
          <Input
            id="logo"
            type="file"
            accept="image/*"
            onChange={(e) => updateFormData({ logo: e.target.files ? e.target.files[0] : null })}
            className="border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  )
}

