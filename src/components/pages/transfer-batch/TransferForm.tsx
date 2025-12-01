import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { motion } from "framer-motion";
import { ArrowRight, Factory } from "lucide-react";
import { useOrganizations } from "@/hooks/useOrganizations";
import type { Organization } from "@/types/organization";

export const TransferForm = ({
  metadata,
  setMetadata,
  isSubmitting,
  handleSubmit,
  receiver,
  setReceiver,
}: {
  metadata: string;
  setMetadata: (value: string) => void;
  isSubmitting: boolean;
  handleSubmit: () => void;
  receiver: string;
  setReceiver: (value: string) => void;
}) => {
  const { data: orgs, isLoading } = useOrganizations();

  const filteredOrgs = orgs || [];

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
            Transfer Batch
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* SELECT ORGANIZATION */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Factory className="h-4 w-4 text-primary" />
              Select Receiving Organization
            </Label>

            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              <Select
                value={receiver}
                onValueChange={(value) => setReceiver(value)}
              >
                <SelectTrigger className="bg-card/50 border-border/50">
                  <SelectValue placeholder="Choose organization..." />
                </SelectTrigger>
                <SelectContent>
                  {filteredOrgs.map((org: Organization) => (
                    <SelectItem value={org.id} key={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Metadata Section */}
          <div>
            <Label className="mb-2 block">
              Transfer Note{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Textarea
              placeholder="Extra information for this transfer..."
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
              rows={4}
              className="bg-card/50 border-border/50 resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !receiver}
            className="w-full h-12 text-base font-semibold bg-linear-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                Processing transfer...
              </>
            ) : (
              <>
                Transfer Batch
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
