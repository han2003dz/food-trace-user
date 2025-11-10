import { Loader2 } from "lucide-react";

export const LoadingProducts = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    </div>
  );
};
