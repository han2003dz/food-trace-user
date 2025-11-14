/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import QRCode from "react-qr-code";
import { getCategoryName } from "@/utils/categories";
import { useGetBatchDetailById } from "@/hooks/useBatch";
import { statusColors } from "@/constants/batch";
import { useIsMobile } from "@/hooks/useMobile";

const BatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { data: batch, isLoading, error } = useGetBatchDetailById(id!);
  console.log("batch", batch);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );

  if (error || !batch)
    return (
      <div className="flex justify-center items-center h-full">
        <p>Batch not found</p>
      </div>
    );

  const timeline = batch?.timeline || [];
  return (
    <div className="space-y-6">
      {/* Back Button */}
      {!isMobile && (
        <Button
          variant="ghost"
          onClick={() => navigate("/batches")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Batches
        </Button>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ================= TIMELINE ================= */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

          <div
            className="relative bg-glass-gradient backdrop-blur-xl border 
              border-border/50 rounded-2xl p-6 h-full"
          >
            <h2 className="text-xl font-semibold mb-6">
              Supply Chain Timeline
            </h2>

            <div className="space-y-6">
              {timeline.map((event: any, index: number) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-4"
                >
                  {/* Vertical line */}
                  {index < timeline.length - 1 && (
                    <div
                      className="absolute left-6 top-12 w-0.5 h-full 
                        bg-linear-to-b from-primary to-transparent"
                    />
                  )}

                  {/* Icon */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className="w-12 h-12 rounded-full bg-linear-to-br 
                        from-primary to-secondary flex items-center 
                        justify-center text-2xl shadow-lg"
                    >
                      🔗
                    </div>
                    <CheckCircle2
                      className="absolute -bottom-1 -right-1 w-5 h-5 
                      text-secondary bg-background rounded-full"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div
                      className="bg-card/30 backdrop-blur-sm border 
                        border-border/30 rounded-lg p-4 hover:border-primary/50 
                        transition-colors"
                    >
                      <h3 className="font-semibold text-foreground uppercase">
                        {event.event_type.replace("_", " ")}
                      </h3>

                      <p className="text-sm text-muted-foreground mt-1">
                        Actor: {batch.current_owner?.name || "Unknown"}
                      </p>

                      {event.metadata && (
                        <pre className="text-xs mt-2 bg-black/20 p-2 rounded">
                          {JSON.stringify(event.metadata, null, 2)}
                        </pre>
                      )}

                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(event.at).toLocaleString()}
                      </p>

                      {event.tx_hash && (
                        <a
                          href={`https://sepolia.basescan.org/tx/${event.tx_hash}`}
                          target="_blank"
                          rel="noopener"
                          className="text-xs text-primary underline mt-2 block"
                        >
                          View TX on BaseScan
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            <div
              className="absolute -inset-0.5 bg-linear-to-r from-secondary/30 
                to-primary/30 rounded-2xl opacity-0 group-hover:opacity-100 
                blur transition-opacity duration-500"
            />
            <div
              className="relative bg-glass-gradient backdrop-blur-xl border 
                border-border/50 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4">
                Product Information
              </h2>

              <div className="space-y-4">
                <Info label="Product Name" value={batch?.product?.name} />
                <Info label="Batch Code" value={batch?.code?.batch_code} mono />
                <Info
                  label="Category"
                  value={getCategoryName(batch?.product?.category)}
                />
                <Info label="Origin" value={batch?.product?.origin} />
                <Info label="Producer" value={batch?.product?.producer_name} />
                <Info label="Status" value={batch?.status} status />
              </div>
            </div>
          </motion.div>

          {/* ================= QR CODE ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div
              className="absolute -inset-0.5 bg-linear-to-r from-primary/30 
                to-secondary/30 rounded-2xl opacity-0 group-hover:opacity-100 
                blur transition-opacity duration-500"
            />
            <div
              className="relative bg-glass-gradient backdrop-blur-xl border 
                  border-border/50 rounded-2xl p-6 text-center"
            >
              <h3 className="text-lg font-semibold mb-4">QR Code</h3>

              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white rounded-xl">
                  <QRCode
                    value={`https://1dh4n9ds-5173.asse.devtunnels.ms/batches/${batch?.id}`}
                    size={150}
                  />
                </div>
              </div>

              <Button
                className="w-full gap-2"
                onClick={() =>
                  window.open(
                    `https://sepolia.basescan.org/address/${batch?.onchain_batch_id}`,
                    "_blank"
                  )
                }
              >
                Verify on BaseScan <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetail;

// ================= Helper Component =================

const Info = ({
  label,
  value,
  mono,
  status,
}: {
  label: string;
  value: any;
  mono?: boolean;
  status?: boolean;
}) => {
  if (!status)
    return (
      <div>
        <label className="text-sm text-muted-foreground">{label}</label>
        <p className={`${mono ? "font-mono text-primary" : "font-medium"}`}>
          {value || "N/A"}
        </p>
      </div>
    );

  return (
    <div>
      <label className="text-sm text-muted-foreground">{label}</label>
      <div className="mt-1">
        <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm
              font-medium border ${statusColors[value]}`}
        >
          {value?.replace("_", " ")}
        </span>
      </div>
    </div>
  );
};
