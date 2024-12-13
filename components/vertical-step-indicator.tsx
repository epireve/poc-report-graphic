import { Check } from 'lucide-react'

interface Step {
  number: number
  title: string
  description: string
}

interface VerticalStepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function VerticalStepIndicator({ steps, currentStep }: VerticalStepIndicatorProps) {
  return (
    <div className="space-y-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-start">
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                currentStep >= step.number
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-300 text-gray-300'
              }`}
            >
              {currentStep > step.number ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{step.number}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-0.5 h-16 ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
          <div className="ml-4">
            <h3
              className={`text-base font-medium ${
                currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {step.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

