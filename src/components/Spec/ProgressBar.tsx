interface ProgressBarProps {
  currentStep: string
  currentLabel: string
  steps: { stepLabel: string; stepNumber: string }[]
}

export default function ProgressBar({ currentStep, currentLabel, steps }: ProgressBarProps) {
  const currentNum = Number(currentStep)

  return (
    <>
      {/* Desktop & Tablet Layout */}
      <div className="desktop:flex tablet:flex hidden gap-x-2">
        {steps.map((step) => {
          const stepNum = Number(step.stepNumber)
          const isActive = stepNum <= currentNum

          return (
            <div
              key={step.stepNumber}
              className={`flex w-full gap-x-2 border-b-[4px] transition-colors ${
                isActive ? 'border-main-500' : 'border-gray2'
              }`}
            >
              <div
                className={`kr-badge-md flex h-[24px] w-[24px] items-center justify-center rounded-full transition-colors ${
                  isActive ? 'bg-main-500 text-white' : 'text-gray3 bg-gray2'
                }`}
              >
                {step.stepNumber}
              </div>
              <p
                className={`kr-badge-md pt-[4px] pb-[8px] transition-colors ${
                  isActive ? 'text-main-500' : 'text-gray3'
                }`}
              >
                {step.stepLabel}
              </p>
            </div>
          )
        })}
      </div>

      {/* Mobile Layout */}
      <div className="desktop:hidden tablet:hidden flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <div className="bg-main-500 kr-badge-md flex h-[24px] w-[24px] items-center justify-center rounded-full text-white">
            {currentStep}
          </div>
          <p className="kr-subtitle-sm text-main-500">{currentLabel}</p>
        </div>

        <div className="flex w-full gap-x-2">
          {steps.map((step) => {
            const stepNum = Number(step.stepNumber)
            const isActive = stepNum <= currentNum

            return (
              <div
                key={step.stepNumber}
                className={`w-full border-b-[4px] transition-colors ${isActive ? 'border-main-500' : 'border-gray2'}`}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
