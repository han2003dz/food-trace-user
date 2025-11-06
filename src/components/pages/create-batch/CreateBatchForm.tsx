// src/components/pages/create-batch/CreateBatchForm.tsx
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { CATEGORIES } from "@/mocks/categories";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { cn } from "@/utils/libs";
import { Calendar } from "@/components/ui/Calendar";
import type { CreateBatchFormData } from "@/types/form";
import type { ChangeEvent, RefObject } from "react";

interface CreateBatchFormProps {
  currentStep: number;
  formData: CreateBatchFormData;
  setFormData: (data: CreateBatchFormData) => void;
  manufactureDate?: Date;
  setManufactureDate: (d?: Date) => void;
  expiryDate?: Date;
  setExpiryDate: (d?: Date) => void;
  selectedImage: string | null;
  handleChangeFormData: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageClick: () => void;
  handleRemoveImage: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export const CreateBatchForm = ({
  currentStep,
  formData,
  setFormData,
  manufactureDate,
  setManufactureDate,
  expiryDate,
  setExpiryDate,
  selectedImage,
  handleChangeFormData,
  handleImageChange,
  handleImageClick,
  handleRemoveImage,
  fileInputRef,
}: CreateBatchFormProps) => {
  return (
    <AnimatePresence mode="wait">
      {currentStep === 0 && (
        <motion.div
          key="step1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name *</Label>
            <Input
              id="productName"
              name="productName"
              placeholder="e.g., Organic Tomatoes"
              value={formData.productName}
              onChange={handleChangeFormData}
              className="bg-card/50"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.categoryId || ""}
              onValueChange={(value) => {
                setFormData({ ...formData, categoryId: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category">
                  {formData.categoryId
                    ? CATEGORIES.find(
                        (cat) => String(cat.id) === formData.categoryId
                      )?.name
                    : "Select category"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Manufacture Date */}
          <div className="space-y-2">
            <Label>Manufacture Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-card/50",
                    !manufactureDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {manufactureDate ? (
                    format(manufactureDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={manufactureDate}
                  onSelect={setManufactureDate}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label>Expiry Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-card/50",
                    !expiryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expiryDate ? (
                    format(expiryDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={setExpiryDate}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>Product Image (Optional)</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {selectedImage ? (
              <div className="relative border-2 border-gray bg-card/50 rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Product preview"
                  className="w-full h-48 object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div
                onClick={handleImageClick}
                className="border-2 border-dashed border-gray bg-card/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload image
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the product..."
              value={formData.description}
              onChange={handleChangeFormData}
              className="bg-card/50 min-h-[100px]"
            />
          </div>
        </motion.div>
      )}

      {currentStep === 1 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="producerName">Producer Name *</Label>
            <Input
              id="producerName"
              name="producerName"
              placeholder="e.g., Green Valley Farm"
              value={formData.producerName}
              onChange={handleChangeFormData}
              className="bg-card/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="origin">Origin *</Label>
            <Input
              id="origin"
              name="origin"
              placeholder="e.g., California, USA"
              value={formData.origin}
              onChange={handleChangeFormData}
              className="bg-card/50"
            />
          </div>
        </motion.div>
      )}

      {currentStep === 2 && (
        <motion.div
          key="step3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          {" "}
          <div className="bg-card/30 rounded-lg p-6 space-y-4">
            {" "}
            <h3 className="text-lg font-semibold text-primary">
              {" "}
              Review Your Batch{" "}
            </h3>{" "}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {" "}
              <div>
                {" "}
                <p className="text-muted-foreground">Product Name</p>{" "}
                <p className="font-medium">
                  {" "}
                  {formData.productName ? formData.productName : "N/A"}{" "}
                </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-muted-foreground">Category</p>{" "}
                <p className="font-medium">
                  {" "}
                  {CATEGORIES.find(
                    (cat) => String(cat.id) === formData.categoryId
                  )?.name
                    ? CATEGORIES.find(
                        (cat) => String(cat.id) === formData.categoryId
                      )?.name
                    : "N/A"}{" "}
                </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-muted-foreground">Producer</p>{" "}
                <p className="font-medium">
                  {" "}
                  {formData.producerName ? formData.producerName : "N/A"}{" "}
                </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-muted-foreground">Origin</p>{" "}
                <p className="font-medium">
                  {" "}
                  {formData.origin ? formData.origin : "N/A"}{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            {formData.description && (
              <div>
                {" "}
                <p className="text-muted-foreground text-sm">
                  {" "}
                  Description{" "}
                </p>{" "}
                <p className="text-sm">{formData.description}</p>{" "}
              </div>
            )}{" "}
            <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
              {" "}
              <div>
                {" "}
                <p className="text-muted-foreground text-sm">
                  {" "}
                  Description{" "}
                </p>{" "}
                <p className="font-mono text-lg">
                  {" "}
                  {formData.description ? formData.description : "N/A"}{" "}
                </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-muted-foreground text-sm">Image</p>{" "}
                <p className="font-mono text-lg">
                  {" "}
                  {formData.description ? formData.description : "N/A"}{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="pt-4 border-t border-border/50">
              {" "}
              <p className="text-muted-foreground text-sm">
                {" "}
                Auto-generated Batch Code{" "}
              </p>{" "}
              <p className="font-mono text-lg text-primary">
                {" "}
                {formData.batchCode}{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
