import { Progress } from "../ui/Progress";
interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  progress: number;
}
export const ProgressBar = ({
  steps,
  currentStep,
  progress,
}: ProgressBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        {steps.map((step, index) => (
          <span
            key={step}
            className={
              index <= currentStep
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }
          >
            {step}
          </span>
        ))}
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
