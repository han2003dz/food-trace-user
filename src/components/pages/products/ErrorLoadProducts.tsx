/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/Button";
interface ErrorLoadProps {
  error: any;
}
export const ErrorLoadProducts = ({ error }: ErrorLoadProps) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <span className="text-2xl">⚠️</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Failed to load products
          </h3>
          <p className="text-sm text-muted-foreground">
            {error?.message || "Something went wrong. Please try again."}
          </p>
        </div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    </div>
  );
};
