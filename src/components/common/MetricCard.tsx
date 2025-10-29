import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  delay?: number;
  gradient?: string;
}

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  delay = 0,
  gradient = "from-primary to-secondary",
}: MetricCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 50;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-linear-to-r from-primary/50 to-secondary/50 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
      <div className="relative bg-glass-gradient backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-linear-to-br ${gradient} bg-opacity-20`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent animate-count-up">
            {count.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
