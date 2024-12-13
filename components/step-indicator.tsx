import { Check } from 'lucide-react'

interface Step {
  number: number
  title: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.number
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-gray-300 text-gray-300'
            }`}>
              {currentStep > step.number ? (
                <Check className="w-6 h-6" />
              ) : (
                <span className="text-sm font-medium">{step.number}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 w-full mx-4 ${
                currentStep > step.number ? 'bg-emerald-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.number} className="w-1/3 px-2">
            <h3 className={`text-sm font-medium mb-1 ${
              currentStep >= step.number ? 'text-emerald-600' : 'text-gray-500'
            }`}>
              {step.title}
            </h3>
            <p className="text-xs text-gray-500">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

