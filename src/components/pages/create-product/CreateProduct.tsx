import { AnimatePresence } from "framer-motion";
import type { CreateProductFormData, HandleChangeFormData } from "@/types/form";
import type { ChangeEvent, RefObject } from "react";
import { BasicInfo } from "./BasicInfo";
import { OriginDetails } from "./OriginDetails";
import { ReviewAndSubmitForm } from "./ReviewAndSubmit";

interface CreateProductFormProps {
  currentStep: number;
  formData: CreateProductFormData;
  handleChangeFormData: HandleChangeFormData;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageClick: () => void;
  handleRemoveImage: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export const CreateProductForm = ({
  currentStep,
  formData,
  handleChangeFormData,
  handleImageChange,
  handleImageClick,
  handleRemoveImage,
  fileInputRef,
}: CreateProductFormProps) => {
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
