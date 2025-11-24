import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import type { BatchDetail } from "@/types/batch";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

interface BatchSummaryProps {
  batch: BatchDetail;
}
export const BatchSummary = ({ batch }: BatchSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-glass-gradient backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-card/30">
          <CardTitle className="text-xl flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Batch Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <Label className="text-muted-foreground text-sm">Batch Code</Label>
            <p className="text-lg font-mono text-foreground mt-1">
              {batch.code?.batch_code}
            </p>
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">
              Product Name
            </Label>
            <p className="text-lg text-foreground mt-1">{batch.product.name}</p>
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">
              Current Owner
            </Label>
            <p className="text-lg text-foreground mt-1">
              {batch.current_owner.name}
            </p>
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">Status</Label>
            <div className="mt-1">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                {batch.status.replace("_", " ").toUpperCase()}
              </span>
            </div>
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">
              Created Date
            </Label>
            <p className="text-lg text-foreground mt-1">
              {new Date(batch.created_at).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
