/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence } from "framer-motion";
import type { CreateBatchFormData, HandleChangeFormData } from "@/types/form";
import { ReviewAndSubmitForm } from "./ReviewAndSubmit";
import { BasicBatchInfo } from "./BasicInfo";
import { BatchInitialData } from "./BatchInitialData";

interface CreateBatchFormProps {
  currentStep: number;
  formData: CreateBatchFormData;
  handleChangeFormData: HandleChangeFormData;
  products: any;
}

export const CreateBatchForm = ({
  currentStep,
  formData,
  products,
  handleChangeFormData,
}: CreateBatchFormProps) => {
  return (
    <AnimatePresence mode="wait">
      {currentStep === 0 && (
        <BasicBatchInfo
          formData={formData}
          products={products}
          handleChangeFormData={handleChangeFormData}
        />
      )}

      {currentStep === 1 && (
        <BatchInitialData
          formData={formData}
          handleChangeFormData={handleChangeFormData}
        />
      )}

      {currentStep === 2 && (
        <ReviewAndSubmitForm formData={formData} products={products} />
      )}
    </AnimatePresence>
  );
};
