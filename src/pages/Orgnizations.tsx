/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Loader2,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useCreateOrganization } from "@/hooks/useOrganizations";
import { ORG_TYPE_ROLES, type OrgType } from "@/types/org";
import { useUserStore } from "@/stores/useUserStore";
import { useRefreshUserProfile } from "@/hooks/useRefetchUser";

export default function CreateOrganization() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { mutate: createOrg, isPending: isSubmitting } =
    useCreateOrganization();

  const { refreshUserProfile } = useRefreshUserProfile();
  const { userDetail } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    org_type: "" as OrgType | "",
    metadata_uri: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    org_type: "",
    location: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      org_type: "",
      location: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Tên tổ chức là bắt buộc";
    }

    if (!formData.org_type) {
      newErrors.org_type = "Vui lòng chọn loại tổ chức";
    }

    if (!formData.location) {
      newErrors.location = "Địa điểm là bắt buộc";
    }
    setErrors(newErrors);
    return !newErrors.name && !newErrors.org_type && !newErrors.location;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    createOrg(
      {
        name: formData.name,
        org_type: formData.org_type,
        metadata_uri: formData.metadata_uri || undefined,
        location: formData.location,
      },
      {
        onSuccess: async () => {
          setShowSuccessModal(true);
          await refreshUserProfile();
        },
        onError: (error: any) => {
          console.error("error", error);
          toast.error(
            error?.response?.data?.message || "Tạo tổ chức thất bại."
          );
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-accent/50"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="w-8 h-8 text-primary" />
            {userDetail?.role === "CUSTOMER"
              ? "Tạo tổ chức"
              : "Tổ chức của bạn"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {userDetail?.role === "CUSTOMER"
              ? "Đăng ký tổ chức của bạn trên hệ thống FoodTrace"
              : "Thông tin tổ chức trên hệ thống FoodTrace"}
          </p>
        </div>
      </div>

      {userDetail?.role === "CONSUMER" ? (
        <>
          <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-xl p-8 space-y-6">
            {/* Organization Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Tên tổ chức *
              </Label>
              <Input
                id="name"
                placeholder="Hợp tác xã GreenFarm"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors({ ...errors, name: "" });
                }}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Địa điểm *
              </Label>
              <Input
                id="location"
                placeholder="Hà Nội - Việt Nam"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  setErrors({ ...errors, location: "" });
                }}
                className={errors.location ? "border-destructive" : ""}
              />
              {errors.location && (
                <p className="text-destructive text-sm">{errors.location}</p>
              )}
            </div>

            {/* Organization Type */}
            <div className="space-y-2">
              <Label htmlFor="org_type" className="text-sm font-medium">
                Loại tổ chức *
              </Label>
              <Select
                value={formData.org_type}
                onValueChange={(value) => {
                  setFormData({ ...formData, org_type: value as OrgType });
                  setErrors({ ...errors, org_type: "" });
                }}
              >
                <SelectTrigger
                  className={errors.org_type ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Chọn loại tổ chức" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRODUCER">🏭 Nhà sản xuất</SelectItem>
                  <SelectItem value="PROCESSOR">⚙️ Nhà chế biến</SelectItem>
                  <SelectItem value="TRANSPORTER">
                    🚚 Đơn vị vận chuyển
                  </SelectItem>
                  <SelectItem value="RETAILER">🏪 Nhà bán lẻ</SelectItem>
                  <SelectItem value="AUDITOR">🔍 Đơn vị kiểm định</SelectItem>
                </SelectContent>
              </Select>
              {errors.org_type && (
                <p className="text-destructive text-sm">{errors.org_type}</p>
              )}
            </div>

            {/* Role Preview */}
            {formData.org_type && (
              <div className="p-4 rounded-lg bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">
                      Quyền hạn: {ORG_TYPE_ROLES[formData.org_type].label}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {ORG_TYPE_ROLES[formData.org_type].description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata URI */}
            <div className="space-y-2">
              <Label htmlFor="metadata_uri" className="text-sm font-medium">
                Metadata URI{" "}
                <span className="text-muted-foreground">(tuỳ chọn)</span>
              </Label>
              <Input
                id="metadata_uri"
                placeholder="ipfs://Qm..."
                value={formData.metadata_uri}
                onChange={(e) =>
                  setFormData({ ...formData, metadata_uri: e.target.value })
                }
              />
              <p className="text-muted-foreground text-xs">
                Lưu trữ metadata mở rộng trên IPFS
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-border/50">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2 bg-linear-to-r from-primary to-secondary min-w-[200px]"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <Building2 className="w-5 h-5" />
                    Tạo tổ chức
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Success Modal */}
          <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-background" />
                  </div>
                </div>
                <DialogTitle className="text-center text-2xl">
                  Đăng ký tổ chức thành công!
                </DialogTitle>
                <DialogDescription className="text-center">
                  Tổ chức của bạn đã được thêm vào FoodTrace và ghi nhận
                  on-chain.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  onClick={() => navigate("/organizations")}
                  className="w-full bg-linear-to-r from-primary to-secondary"
                >
                  Tiếp tục đến trang tổ chức
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-xl p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Tên tổ chức *
              </Label>
              <Input
                id="name"
                value={userDetail?.organization?.name}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Địa điểm *
              </Label>
              <Input
                id="location"
                value={userDetail?.organization?.location}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="org_type" className="text-sm font-medium">
                Loại tổ chức *
              </Label>
              <Select value={userDetail?.organization?.org_type}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRODUCER">🏭 Nhà sản xuất</SelectItem>
                  <SelectItem value="PROCESSOR">⚙️ Nhà chế biến</SelectItem>
                  <SelectItem value="TRANSPORTER">
                    🚚 Đơn vị vận chuyển
                  </SelectItem>
                  <SelectItem value="RETAILER">🏪 Nhà bán lẻ</SelectItem>
                  <SelectItem value="AUDITOR">🔍 Đơn vị kiểm định</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metadata_uri" className="text-sm font-medium">
                Metadata URI (tuỳ chọn)
              </Label>
              <Input id="metadata_uri" placeholder="ipfs://Qm..." />
            </div>

            <div className="flex justify-end pt-6 border-t border-border/50">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2 bg-linear-to-r from-primary to-secondary min-w-[200px]"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <Building2 className="w-5 h-5" />
                    Cập nhật tổ chức
                  </>
                )}
              </Button>
            </div>
          </div>

          <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-background" />
                  </div>
                </div>
                <DialogTitle className="text-center text-2xl">
                  Cập nhật thành công!
                </DialogTitle>
                <DialogDescription className="text-center">
                  Thông tin tổ chức của bạn đã được cập nhật và ghi nhận
                  on-chain.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  onClick={() => navigate("/")}
                  className="w-full bg-linear-to-r from-primary to-secondary"
                >
                  Về trang tổng quan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
