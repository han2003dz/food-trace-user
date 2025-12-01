import {
  Factory,
  Truck,
  CheckCircle2,
  Warehouse,
  ShoppingCart,
  RotateCcw,
  ArrowRightLeft,
  Flame,
} from "lucide-react";

export const timelineIcons: Record<string, React.ReactNode> = {
  CREATED: <Factory className="w-6 h-6 text-white" />,
  PROCESSED: <Flame className="w-6 h-6 text-white" />,
  SHIPPED: <Truck className="w-6 h-6 text-white" />,
  RECEIVED: <CheckCircle2 className="w-6 h-6 text-white" />,
  STORED: <Warehouse className="w-6 h-6 text-white" />,
  SOLD: <ShoppingCart className="w-6 h-6 text-white" />,
  RECALLED: <RotateCcw className="w-6 h-6 text-white" />,
  TRANSFER: <ArrowRightLeft className="w-6 h-6 text-white" />,
};
