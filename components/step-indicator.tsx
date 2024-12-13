import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8 max-w-3xl mx-auto overflow-x-auto">
      <div className="flex justify-between items-center mb-4 relative min-w-[300px] max-w-[400px]">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 transition-all duration-300"
          style={{
            width: `${Math.max(
              0,
              ((currentStep - 1) / (steps.length - 1)) * 100
            )}%`,
          }}
        />

        {/* Steps */}
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative flex flex-col items-center"
            style={{ width: "200px", minWidth: "200px" }}
          >
            {/* Circle */}
            <div
              className={`
                flex items-center justify-center w-12 h-12 rounded-full border-2 
                transition-colors duration-300 bg-white shrink-0
                ${
                  currentStep >= step.number
                    ? "border-emerald-500 text-emerald-500"
                    : "border-gray-300 text-gray-300"
                }
                ${
                  currentStep > step.number
                    ? "bg-emerald-500 !text-white border-emerald-500"
                    : ""
                }
              `}
            >
              {currentStep > step.number ? (
                <Check className="w-6 h-6" />
              ) : (
                <span className="text-sm font-medium">{step.number}</span>
              )}
            </div>

            {/* Text */}
            <div className="mt-4 text-center w-full px-4">
              <h3
                className={`
                  text-sm font-medium mb-1 transition-colors duration-300
                  ${
                    currentStep >= step.number
                      ? "text-emerald-600"
                      : "text-gray-500"
                  }
                `}
              >
                {step.title}
              </h3>
              <p className="text-xs text-gray-500 min-h-[32px] leading-tight">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
