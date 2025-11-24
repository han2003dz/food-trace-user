// import { BatchNotFound } from "@/components/common/BatchNotFound";
// import { useToast } from "@/hooks/useToast";
// import { ArrowRight } from "lucide-react";
// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import { TransferBatchHeader } from "./TransferBatchHeader";
// import { Timeline } from "./Timeline";
// import { BatchSummary } from "./BatchSummary";
// import { TransferForm } from "./TransferForm";
// import { eventTypes, knownPartners } from "./constants/eventTypes";
// import { useGetBatchDetailById } from "@/hooks/useBatch";
// const TransferBatch = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { data: batch, isLoading, error } = useGetBatchDetailById(id!);

//   // State management
//   const [walletAddress, setWalletAddress] = useState("");
//   const [selectedPartner, setSelectedPartner] = useState("");
//   const [eventType, setEventType] = useState("");
//   const [metadata, setMetadata] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<{ wallet?: string; event?: string }>({});

//   // Mock user role (in real app, this would come from auth context)
//   const userRole = "producer";

//   if (!batch) {
//     return <BatchNotFound />;
//   }

//   // Get available events for current user role
//   const availableEvents = eventTypes[userRole as keyof typeof eventTypes] || [];

//   // Validate wallet address (Ethereum format)
//   const validateWalletAddress = (address: string): boolean => {
//     const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
//     return ethAddressRegex.test(address);
//   };

//   // Generate SHA-256 hash preview (simplified for demo)
//   const generateHashPreview = (text: string): string => {
//     if (!text) return "";
//     // In real app, use crypto.subtle.digest
//     const mockHash = btoa(text).substring(0, 64);
//     return `SHA-256: ${mockHash}...`;
//   };

//   // Handle partner selection
//   const handlePartnerSelect = (partnerId: string) => {
//     setSelectedPartner(partnerId);
//     const partner = knownPartners.find((p) => p.id === partnerId);
//     if (partner) {
//       setWalletAddress(partner.address);
//       setErrors({ ...errors, wallet: undefined });
//     }
//   };

//   // Handle submit
//   const handleSubmit = async () => {
//     const newErrors: { wallet?: string; event?: string } = {};

//     // Validate wallet address
//     if (!walletAddress) {
//       newErrors.wallet = "Wallet address is required";
//     } else if (!validateWalletAddress(walletAddress)) {
//       newErrors.wallet = "Invalid wallet address format";
//     }

//     // Validate event type
//     if (!eventType) {
//       newErrors.event = "Event type is required";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsSubmitting(true);

//     // Simulate blockchain transaction
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     // Mock transaction hash
//     const txHash = "0x" + Math.random().toString(16).substring(2, 66);

//     setIsSubmitting(false);

//     toast({
//       title: "Transfer Successful",
//       description: (
//         <div className="space-y-2">
//           <p>Batch transferred successfully!</p>
//           <a
//             href={`https://basescan.org/tx/${txHash}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-2 text-primary hover:underline text-sm"
//           >
//             View on BaseScan
//             <ArrowRight className="h-3 w-3" />
//           </a>
//         </div>
//       ),
//     });

//     // Navigate back after success
//     setTimeout(() => {
//       navigate(`/batches/${id}`);
//     }, 2000);
//     return (
//       <div className="container mx-auto px-6 py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Header */}
//           <TransferBatchHeader batchId={batch.id} />

//           {/* Timeline */}
//           <Timeline currentStepIndex={currentStepIndex} />

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Left Column: Batch Summary */}
//             <BatchSummary batch={batch} />

//             {/* Right Column: Transfer Form */}
//             <TransferForm
//               walletAddress={walletAddress}
//               setWalletAddress={setWalletAddress}
//               knownPartners={knownPartners}
//               selectedPartner={selectedPartner}
//               handlePartnerSelect={handlePartnerSelect}
//               eventType={eventType}
//               setEventType={setEventType}
//               availableEvents={availableEvents}
//               metadata={metadata}
//               setMetadata={setMetadata}
//               errors={errors}
//               setErrors={setErrors}
//               isSubmitting={isSubmitting}
//               handleSubmit={handleSubmit}
//               generateHashPreview={generateHashPreview}
//             />
//           </div>
//         </motion.div>
//       </div>
//     );
//   };
// };
// export default TransferBatch;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { useToast } from "@/hooks/useToast";
import { useGetBatchDetailById, useUpdateBatchStatus } from "@/hooks/useBatch";

import { TransferBatchHeader } from "./TransferBatchHeader";
import { Timeline } from "./Timeline";
import { BatchSummary } from "./BatchSummary";
import { TransferForm } from "./TransferForm";
import { eventTypes } from "./constants/eventTypes";
import { BatchNotFound } from "@/components/common/BatchNotFound";
import { useTransferBatch } from "@/hooks/contracts/useTransfer";
import { Button } from "@/components/ui/Button";

const TransferBatch = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Lấy chi tiết batch
  const { data: batch, isLoading, error } = useGetBatchDetailById(id!);

  // TODO: sau này lấy role thật từ user (getMe / auth store)
  const userRole = "producer";
  const availableEvents = eventTypes[userRole as keyof typeof eventTypes] || [];

  // Local state form
  const [eventType, setEventType] = useState("");
  const [metadata, setMetadata] = useState("");
  const [receiver, setReceiver] = useState("");
  const [errors, setErrors] = useState<{ event?: string }>({});

  // Mutation update status
  const { mutate: updateStatus, isPending } = useUpdateBatchStatus();
  const { transfer } = useTransferBatch();
  const handleSubmit = () => {
    const newErrors: { event?: string } = {};

    if (!eventType) {
      newErrors.event = "Event type is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!id) return;

    updateStatus(
      {
        batchId: id,
        data: {
          event_type: eventType,
          metadata_uri: metadata || undefined,
          receiver_wallet: receiver || undefined,
        },
      },
      {
        onSuccess: (res: any) => {
          toast({
            title: "Transfer successful",
            description: (
              <div className="space-y-2 text-sm">
                <p>Batch status has been updated on-chain.</p>
                {res?.tx_hash && (
                  <a
                    href={`https://sepolia.basescan.org/tx/${res.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    View transaction on BaseScan
                    <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            ),
          });

          setTimeout(() => {
            navigate(`/batches/${id}`);
          }, 1500);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Failed to update batch status";
          toast({
            title: "Transfer failed",
            description: msg,
            variant: "destructive",
          });
        },
      }
    );
  };

  // Loading / error / not found
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !batch) {
    return <BatchNotFound />;
  }

  // Tính step hiện tại cho timeline (optional – tùy bạn map)
  // const currentStepIndex = Math.max(
  //   0,
  //   batch.timeline?.length ? batch.timeline.length - 1 : 0
  // );

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button onClick={() => transfer()}>OK</Button>
        {/* Header */}
        <TransferBatchHeader batchId={batch.id} />

        {/* Timeline tổng quan (FE render từ batch.timeline) */}
        {/* <Timeline
          currentStepIndex={currentStepIndex}
          timeline={batch.timeline}
        /> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Left Column: Batch Summary */}
          <BatchSummary batch={batch} />

          {/* Right Column: Transfer Form */}
          <TransferForm
            eventType={eventType}
            setEventType={setEventType}
            receiver={receiver}
            setReceiver={setReceiver}
            availableEvents={availableEvents}
            metadata={metadata}
            setMetadata={setMetadata}
            errors={errors}
            setErrors={setErrors}
            isSubmitting={isPending}
            handleSubmit={handleSubmit}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default TransferBatch;
