interface ProgressBarProps {
  currentStep: string
  currentLabel: string
  steps: { stepLabel: string; stepNumber: string }[]
}
export default function ProgressBar({ currentStep, currentLabel, steps }: ProgressBarProps) {
  return (
    <>
      <div className="desktop:flex tablet:flex hidden gap-x-2">
        {steps.map((step) => (
          <div key={step.stepNumber} className="border-main-500 flex w-full gap-x-2 border-b-[4px]">
            <div className="bg-main-500 kr-badge-md flex h-[24px] w-[24px] items-center justify-center rounded-full text-white">
              {step.stepNumber}
            </div>
            <p className="kr-badge-md text-main-500 pt-[4px] pb-[8px]">{step.stepLabel}</p>
          </div>
        ))}
      </div>
      <div className="desktop:hidden tablet:hidden flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <div className="bg-main-500 kr-badge-md flex h-[24px] w-[24px] items-center justify-center rounded-full text-white">
            {currentStep}
          </div>
          <p className="kr-subtitle-sm text-main-500">{currentLabel}</p>
        </div>

        <div className="flex w-full gap-x-2">
          {steps.map((step) => (
            <div className="border-main-500 w-full border-b-[4px]" key={step.stepNumber} />
          ))}
        </div>
      </div>
    </>
  )
}
