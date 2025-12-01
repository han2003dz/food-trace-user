/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useToast } from "@/hooks/useToast";
import { useGetBatchDetailById } from "@/hooks/useBatch";

import { TransferBatchHeader } from "./TransferBatchHeader";
import { BatchSummary } from "./BatchSummary";
import { TransferForm } from "./TransferForm";
import { BatchNotFound } from "@/components/common/BatchNotFound";

import { useTransferBatch } from "@/hooks/useTransfer";

const TransferBatch = () => {
  const { id } = useParams<{ id: string }>();
  console.log("id", id);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch batch
  const { data: batch, isLoading, error } = useGetBatchDetailById(id!);

  // const userRole = "producer";
  // const availableEvents = eventTypes[userRole as keyof typeof eventTypes] || [];

  // const [eventType, setEventType] = useState("");
  const [metadata, setMetadata] = useState("");
  const [receiver, setReceiver] = useState("");
  // const [errors, setErrors] = useState<{ event?: string }>({});

  // const { mutate: updateStatus, isPending } = useUpdateBatchStatus();
  const { mutate: transfer, isPending: isTransferring } = useTransferBatch();

  // -------------------------
  // FIXED: Correct submit handler
  // -------------------------
  const handleSubmitTransfer = () => {
    if (!receiver) {
      toast({
        title: "Missing receiver",
        description: "Please select receiving organization.",
        variant: "destructive",
      });
      return;
    }

    transfer(
      {
        batchId: id!,
        data: {
          to_org_id: receiver,
          note: metadata || "",
        },
      },
      {
        onSuccess: () => {
          toast({
            title: "Transfer successful",
            description: "This batch has been transferred.",
          });

          setTimeout(() => {
            navigate(`/batches/${id}`);
          }, 1200);
        },
        onError: (err: any) => {
          toast({
            title: "Transfer failed",
            description:
              err?.response?.data?.message || "Unable to transfer batch.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !batch) return <BatchNotFound />;

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Remove this test button OR pass params */}
        {/* <Button onClick={() => transfer()}>OK</Button> */}

        <TransferBatchHeader batchId={batch.id} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <BatchSummary batch={batch} />

          <TransferForm
            // eventType={eventType}
            // setEventType={setEventType}
            receiver={receiver}
            setReceiver={setReceiver}
            // availableEvents={availableEvents}
            metadata={metadata}
            setMetadata={setMetadata}
            // errors={errors}
            // setErrors={setErrors}
            isSubmitting={isTransferring}
            handleSubmit={handleSubmitTransfer} // ✔ FIXED
          />
        </div>
      </motion.div>
    </div>
  );
};

export default TransferBatch;
