import { Card, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
export const Timeline = ({
  currentStepIndex = 0,
  timelineSteps = [
    { status: "created", label: "Created" },
    { status: "shipped", label: "Shipped" },
    { status: "received", label: "Received" },
    { status: "processed", label: "Processed" },
    { status: "stored", label: "Stored" },
    { status: "sold", label: "Sold" },
  ],
}: {
  currentStepIndex?: number;
  timelineSteps?: { status: string; label: string }[];
}) => {
  return (
    <Card className="mb-8 bg-glass-gradient backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border/50">
            <div
              className="h-full bg-linear-to-r from-primary to-secondary transition-all duration-500"
              style={{
                width: `${
                  (currentStepIndex / (timelineSteps.length - 1)) * 100
                }%`,
              }}
            />
          </div>

          {/* Steps */}
          {timelineSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div
                key={step.status}
                className="flex flex-col items-center relative z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-linear-to-r from-primary to-secondary border-primary shadow-[0_0_20px_rgba(49,210,242,0.5)]"
                      : "bg-muted border-border"
                  }`}
                >
                  {isCompleted && (
                    <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                  )}
                </motion.div>
                <p
                  className={`mt-2 text-xs font-medium ${
                    isCurrent
                      ? "text-primary"
                      : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
