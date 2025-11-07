import { AnimatePresence } from "framer-motion";
import type { CreateBatchFormData, HandleChangeFormData } from "@/types/form";
import type { ChangeEvent, RefObject } from "react";
import { ReviewAndSubmitForm } from "./ReviewAndSubmit";
import { OriginDetails } from "./OriginDetails";
import { BasicInfo } from "./BasicInfo";

interface CreateBatchFormProps {
  currentStep: number;
  formData: CreateBatchFormData;
  handleChangeFormData: HandleChangeFormData;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageClick: () => void;
  handleRemoveImage: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export const CreateBatchForm = ({
  currentStep,
  formData,
  handleChangeFormData,
  handleImageChange,
  handleImageClick,
  handleRemoveImage,
  fileInputRef,
}: CreateBatchFormProps) => {
  return (
    <AnimatePresence mode="wait">
      {currentStep === 0 && (
        <BasicInfo
          formData={formData}
          handleChangeFormData={handleChangeFormData}
          handleImageChange={handleImageChange}
          handleImageClick={handleImageClick}
          handleRemoveImage={handleRemoveImage}
          fileInputRef={fileInputRef}
        />
      )}

      {currentStep === 1 && (
        <OriginDetails
          formData={formData}
          handleChangeFormData={handleChangeFormData}
        />
      )}

      {currentStep === 2 && <ReviewAndSubmitForm formData={formData} />}
    </AnimatePresence>
  );
};
