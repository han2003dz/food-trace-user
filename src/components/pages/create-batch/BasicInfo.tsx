import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { CATEGORIES } from "@/mocks/categories";
import type { CreateBatchFormData, HandleChangeFormData } from "@/types/form";
import { cn } from "@/utils/libs";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CalendarIcon, Trash2, Upload } from "lucide-react";
import type { ChangeEvent, RefObject } from "react";

interface BasicInfoProps {
  formData: CreateBatchFormData;
  handleChangeFormData: HandleChangeFormData;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageClick: () => void;
  handleRemoveImage: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export const BasicInfo = ({
  formData,
  handleChangeFormData,
  handleImageChange,
  handleImageClick,
  handleRemoveImage,
  fileInputRef,
}: BasicInfoProps) => {
  return (
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
          onValueChange={(value) => handleChangeFormData("categoryId", value)}
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
        <Label>Manufacture Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-card/50",
                !formData.manufactureDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.manufactureDate ? (
                format(formData.manufactureDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.manufactureDate}
              onSelect={(date) => handleChangeFormData("manufactureDate", date)}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Expiry Date */}
      <div className="space-y-2">
        <Label>Expiry Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-card/50",
                !formData.expiryDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.expiryDate ? (
                format(formData.expiryDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.expiryDate}
              onSelect={(date) => handleChangeFormData("expiryDate", date)}
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

        {formData.image ? (
          <div className="relative border-2 border-gray bg-card/50 rounded-lg overflow-hidden">
            <img
              src={formData.image}
              alt="Product preview"
              className="w-full h-48 object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 bg-transparent cursor-pointer hover:bg-card/50"
              onClick={handleRemoveImage}
            >
              <Trash2 color="red" className="w-4 h-4" />
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
  );
};
