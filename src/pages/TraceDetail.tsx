import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { mockBatches, mockTimeline, statusColors } from "@/utils/mockData";
import { Button } from "@/components/ui/Button";
import QRCode from "react-qr-code";

const BatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const batch = mockBatches.find((b) => b.id === id);

  if (!batch) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Batch not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/batches")}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Batches
      </Button>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
          <div className="relative bg-glass-gradient backdrop-blur-xl border border-border/50 rounded-2xl p-6 h-full">
            <h2 className="text-xl font-semibold mb-6">
              Supply Chain Timeline
            </h2>

            <div className="space-y-6">
              {mockTimeline.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-4"
                >
                  {/* Timeline Line */}
                  {index < mockTimeline.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-full bg-linear-to-b from-primary to-transparent" />
                  )}

                  {/* Icon */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-2xl shadow-lg">
                      {event.icon}
                    </div>
                    {event.status === "completed" && (
                      <CheckCircle2 className="absolute -bottom-1 -right-1 w-5 h-5 text-secondary bg-background rounded-full" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <h3 className="font-semibold text-foreground">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-linear-to-r from-secondary/30 to-primary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
            <div className="relative bg-glass-gradient backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                Product Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">
                    Product Name
                  </label>
                  <p className="text-lg font-medium">{batch.product}</p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">
                    Batch Code
                  </label>
                  <p className="font-mono text-primary">{batch.batchCode}</p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">
                    Category
                  </label>
                  <p className="font-medium">{batch.category}</p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">
                    Producer
                  </label>
                  <p className="font-medium">{batch.producerName}</p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">
                    Origin
                  </label>
                  <p className="font-medium">{batch.location}</p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">
                    Status
                  </label>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${
                        statusColors[batch.status]
                      }`}
                    >
                      {batch.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* QR Code & Verification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
            <div className="relative bg-glass-gradient backdrop-blur-xl border border-border/50 rounded-2xl p-6 text-center">
              <h3 className="text-lg font-semibold mb-4">QR Code</h3>
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white rounded-xl">
                  <QRCode
                    value={`https://foodtrace.app/batch/${batch.id}`}
                    size={150}
                  />
                </div>
              </div>
              <Button
                className="w-full gap-2"
                onClick={() =>
                  window.open(`https://sepolia.basescan.org/`, "_blank")
                }
              >
                Verify on BaseScan
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetail;
