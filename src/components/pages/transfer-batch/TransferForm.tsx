// import { Button } from "@/components/ui/Button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
// import { Input } from "@/components/ui/Input";
// import { Label } from "@/components/ui/Label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/Select";
// import { Textarea } from "@/components/ui/Textarea";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/Tooltip";
// import { motion } from "framer-motion";
// import { ArrowRight, Info, Wallet } from "lucide-react";

// export const TransferForm = ({
//   walletAddress,
//   setWalletAddress,
//   knownPartners,
//   selectedPartner,
//   handlePartnerSelect,
//   eventType,
//   setEventType,
//   availableEvents,
//   metadata,
//   setMetadata,
//   errors,
//   setErrors,
//   isSubmitting,
//   handleSubmit,
//   generateHashPreview,
// }: {
//   walletAddress: string;
//   setWalletAddress: (value: string) => void;
//   knownPartners: { id: string; name: string; address: string }[];
//   selectedPartner: string;
//   handlePartnerSelect: (value: string) => void;
//   eventType: string;
//   setEventType: (value: string) => void;
//   availableEvents: {
//     value: string;
//     label: string;
//     icon: React.ComponentType<any>;
//     description: string;
//   }[];
//   metadata: string;
//   setMetadata: (value: string) => void;
//   errors: { wallet?: string; event?: string };
//   setErrors: (errors: { wallet?: string; event?: string }) => void;
//   isSubmitting: boolean;
//   handleSubmit: () => void;
//   generateHashPreview: (input: string) => string;
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//     >
//       <Card className="bg-glass-gradient backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden">
//         <CardHeader className="border-b border-border/50 bg-card/30">
//           <CardTitle className="text-xl flex items-center gap-2">
//             <ArrowRight className="h-5 w-5 text-secondary" />
//             Transfer Details
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-6 space-y-6">
//           {/* Recipient Section */}
//           <div className="space-y-4">
//             <div>
//               <Label className="flex items-center gap-2 mb-2">
//                 <Wallet className="h-4 w-4 text-primary" />
//                 Recipient Wallet Address
//               </Label>
//               <Input
//                 placeholder="0x..."
//                 value={walletAddress}
//                 onChange={(e) => {
//                   setWalletAddress(e.target.value);
//                   setErrors({ ...errors, wallet: undefined });
//                 }}
//                 className={`bg-card/50 border-border/50 focus:border-primary ${
//                   errors.wallet ? "border-destructive" : ""
//                 }`}
//               />
//               {errors.wallet && (
//                 <p className="text-destructive text-sm mt-1">{errors.wallet}</p>
//               )}
//             </div>

//             <div>
//               <Label className="mb-2">Or Select Known Partner</Label>
//               <Select
//                 value={selectedPartner}
//                 onValueChange={handlePartnerSelect}
//               >
//                 <SelectTrigger className="bg-card/50 border-border/50">
//                   <SelectValue placeholder="Choose a partner" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {knownPartners.map((partner) => (
//                     <SelectItem key={partner.id} value={partner.id}>
//                       {partner.name} ({partner.address})
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Event Type Selection */}
//           <div>
//             <Label className="mb-2">Event Type</Label>
//             <Select
//               value={eventType}
//               onValueChange={(value) => {
//                 setEventType(value);
//                 setErrors({ ...errors, event: undefined });
//               }}
//             >
//               <SelectTrigger
//                 className={`bg-card/50 border-border/50 ${
//                   errors.event ? "border-destructive" : ""
//                 }`}
//               >
//                 <SelectValue placeholder="Select event type" />
//               </SelectTrigger>
//               <SelectContent>
//                 {availableEvents.map((event) => {
//                   const Icon = event.icon;
//                   return (
//                     <SelectItem key={event.value} value={event.value}>
//                       <div className="flex items-center gap-2">
//                         <Icon className="h-4 w-4" />
//                         <span>{event.label}</span>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Info className="h-3 w-3 text-muted-foreground" />
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>{event.description}</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </div>
//                     </SelectItem>
//                   );
//                 })}
//               </SelectContent>
//             </Select>
//             {errors.event && (
//               <p className="text-destructive text-sm mt-1">{errors.event}</p>
//             )}
//           </div>

//           {/* Metadata Section */}
//           <div>
//             <Label className="mb-2">
//               Event Metadata{" "}
//               <span className="text-muted-foreground">(Optional)</span>
//             </Label>
//             <Textarea
//               placeholder="Add additional information about this transfer..."
//               value={metadata}
//               onChange={(e) => setMetadata(e.target.value)}
//               rows={4}
//               className="bg-card/50 border-border/50 resize-none"
//             />
//             {metadata && (
//               <p className="text-xs text-muted-foreground mt-2 font-mono">
//                 {generateHashPreview(metadata)}
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <Button
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className="w-full h-12 text-base font-semibold bg-linear-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
//                 Processing Transfer...
//               </>
//             ) : (
//               <>
//                 Submit Transfer
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </>
//             )}
//           </Button>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { motion } from "framer-motion";
import { ArrowRight, Info, Wallet } from "lucide-react";

/**
 * Props description:
 * - eventType: current selected event type (SHIPPED / RECEIVED / STORED / SOLD / RECALL...)
 * - availableEvents: list of events allowed for current userRole
 * - metadata: optional metadata URI or description that BE will hash & store
 * - errors: simple validation errors (only event required)
 */
export const TransferForm = ({
  eventType,
  setEventType,
  availableEvents,
  metadata,
  setMetadata,
  errors,
  setErrors,
  isSubmitting,
  handleSubmit,
  receiver,
  setReceiver,
}: {
  eventType: string;
  setEventType: (value: string) => void;
  availableEvents: {
    value: string;
    label: string;
    icon: React.ComponentType<any>;
    description: string;
  }[];
  metadata: string;
  setMetadata: (value: string) => void;
  errors: { event?: string };
  setErrors: (errors: { event?: string }) => void;
  isSubmitting: boolean;
  handleSubmit: () => void;
  receiver: string;
  setReceiver: (value: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-glass-gradient backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-card/30">
          <CardTitle className="text-xl flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-secondary" />
            Transfer / Record Event
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Wallet className="h-4 w-4 text-primary" />
              Recipient Wallet Address
            </Label>
            <Input
              placeholder="0x..."
              value={receiver}
              onChange={(e) => {
                setReceiver(e.target.value);
                setErrors({ ...errors });
              }}
              className={`bg-card/50 border-border/50 focus:border-primary `}
            />
          </div>
          {/* Event Type Selection */}
          <div>
            <Label className="mb-2 block">Event Type *</Label>
            <Select
              value={eventType}
              onValueChange={(value) => {
                setEventType(value);
                setErrors({ ...errors, event: undefined });
              }}
            >
              <SelectTrigger
                className={`bg-card/50 border-border/50 ${
                  errors.event ? "border-destructive" : ""
                }`}
              >
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {availableEvents.map((event) => {
                  const Icon = event.icon;
                  return (
                    <SelectItem key={event.value} value={event.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{event.label}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-xs">
                              {event.description}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.event && (
              <p className="text-destructive text-sm mt-1">{errors.event}</p>
            )}
          </div>

          {/* Metadata Section */}
          <div>
            <Label className="mb-2 block">
              Event Metadata{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Textarea
              placeholder="Extra information about this event (e.g. shipping note, storage condition, receiver info...)"
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
              rows={4}
              className="bg-card/50 border-border/50 resize-none"
            />
            {/* Nếu sau này bạn muốn cho user nhập luôn metadata_uri (ipfs://...), 
                có thể đổi Textarea thành Input hoặc thêm field riêng */}
          </div>

          {/* Optional: preview metadata length */}
          {metadata && (
            <div className="text-xs text-muted-foreground flex items-center justify-between">
              <span>Metadata length: {metadata.length} chars</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold bg-linear-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                Processing on-chain...
              </>
            ) : (
              <>
                Submit Event
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
