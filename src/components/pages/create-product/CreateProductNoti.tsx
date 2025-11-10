import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const CreateProductNoti = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center h-[80vh]"
    >
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <CheckCircle2 className="w-24 h-24 text-secondary mx-auto" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Product Created Successfully!
          </h2>
          <p className="text-muted-foreground mt-2">
            Redirecting to product management...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
