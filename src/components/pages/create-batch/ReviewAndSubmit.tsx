import { CATEGORIES } from "@/mocks/categories";
import type { CreateBatchFormData } from "@/types/form";
import { motion } from "framer-motion";
import { format } from "date-fns";
interface ReviewAndSubmitFormProps {
  formData: CreateBatchFormData;
}
export const ReviewAndSubmitForm = ({ formData }: ReviewAndSubmitFormProps) => {
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
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Product Name</p>
            <p className="font-medium">
              {formData.productName ? formData.productName : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Category</p>
            <p className="font-medium">
              {CATEGORIES.find((cat) => String(cat.id) === formData.categoryId)
                ?.name
                ? CATEGORIES.find(
                    (cat) => String(cat.id) === formData.categoryId
                  )?.name
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Producer</p>
            <p className="font-medium">
              {formData.producerName ? formData.producerName : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Origin</p>
            <p className="font-medium">
              {formData.origin ? formData.origin : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Manufacture Date</p>
            <p className="font-medium">
              {formData.manufactureDate
                ? format(formData.manufactureDate, "PPP")
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Expiry Date</p>
            <p className="font-medium">
              {formData.expiryDate ? format(formData.expiryDate, "PPP") : "N/A"}
            </p>
          </div>
        </div>
        {formData.description && (
          <div>
            <p className="text-muted-foreground text-sm"> Description </p>
            <p className="text-sm">{formData.description}</p>
          </div>
        )}
        <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-sm"> Description </p>
            <p className="font-mono text-lg">
              {formData.description ? formData.description : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Image</p>
            <p className="font-mono text-lg">
              {formData.description ? formData.description : "N/A"}
            </p>
          </div>
        </div>
        <div className="pt-4 border-t border-border/50">
          <p className="text-muted-foreground text-sm">
            Auto-generated Batch Code
          </p>
          <p className="font-mono text-lg text-primary">{formData.batchCode}</p>
        </div>
      </div>
    </motion.div>
  );
};
