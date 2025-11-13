/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CreateBatchFormData } from "@/types/form";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/Label";

interface ReviewAndSubmitFormProps {
  formData: CreateBatchFormData;
  products: any;
}

export const ReviewAndSubmitForm = ({
  formData,
  products,
}: ReviewAndSubmitFormProps) => {
  const product = products?.find((p: any) => p.id === formData.product_id);

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-card/30 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-primary">
          Review Your Batch
        </h3>

        {/* Basic info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Product</p>
            <p className="font-medium">{product?.name || "N/A"}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Creator Organization ID</p>
            <p className="font-mono text-xs">
              {formData.creator_org_id || "N/A"}
            </p>
          </div>
        </div>

        {/* Initial data */}
        <div className="space-y-2 pt-4 border-t border-border/50">
          <Label className="text-sm text-muted-foreground">
            Initial Batch Data
          </Label>
          <p className="text-sm whitespace-pre-wrap bg-card/40 rounded-md p-3">
            {formData.initial_data_raw || "No initial data provided."}
          </p>
        </div>

        {/* Metadata URI */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Metadata URI</p>
          <p className="text-sm font-mono">
            {formData.metadata_uri && formData.metadata_uri.trim().length > 0
              ? formData.metadata_uri
              : "(none)"}
          </p>
        </div>

        {/* Hash */}
        <div className="space-y-2 pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Generated Initial Data Hash
          </p>
          <p className="font-mono text-xs break-all">
            {formData.initial_data_hash || "N/A"}
          </p>
        </div>

        {/* Note about batch code */}
        <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground">
          Batch code will be generated on-chain and synced back to the system
          after transaction confirmation.
        </div>
      </div>
    </motion.div>
  );
};
