type ProcessStep = {
  number: number;
  title: string;
  description: string | React.ReactNode;
};

type ProcessStepsProps = {
  steps: ProcessStep[];
  className?: string;
};

export function ProcessSteps({ steps, className = "" }: ProcessStepsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {steps.map((step) => (
        <div key={step.number} className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
              {step.number}
            </div>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="text-base font-semibold text-slate-900 mb-1">
              {step.title}
            </h3>
            <div className="text-sm text-slate-700 leading-relaxed">
              {typeof step.description === "string" ? (
                <p>{step.description}</p>
              ) : (
                step.description
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

