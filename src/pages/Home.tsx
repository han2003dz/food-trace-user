import { Package, CheckCircle2, Users, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/common/MetricCard";
import { mockBatches, statusColors } from "@/utils/mockData";
import { useAuthStatus } from "@/hooks/useAuth";
import { VerifyOwnershipModal } from "@/components/common/VerifyOwnershipModal";
import { useGetTotalBatches } from "@/hooks/contracts/useBatches";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isConnected, isAuthenticated } = useAuthStatus();
  const { totalBatches, committer, paused } = useGetTotalBatches();
  console.log("committer", committer);
  console.log("paused", paused);
  console.log(
    "isConnected && !isAuthenticated",
    isConnected && !isAuthenticated
  );
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your food supply chain
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Batches"
          value={totalBatches ?? 0}
          icon={Package}
          gradient="from-blue-500 to-cyan-500"
        />
        <MetricCard
          title="Verified Transactions"
          value={3849}
          icon={CheckCircle2}
          delay={0.1}
          gradient="from-green-500 to-emerald-500"
        />
        <MetricCard
          title="Registered Producers"
          value={156}
          icon={Users}
          delay={0.2}
          gradient="from-purple-500 to-pink-500"
        />
        <MetricCard
          title="Active Supply Chains"
          value={89}
          icon={Workflow}
          delay={0.3}
          gradient="from-orange-500 to-red-500"
        />
      </div>

      {/* Recent Batches Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
        <div className="relative bg-glass-gradient backdrop-blur-xl border border-border/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Batches</h2>
            <Button
              onClick={() => navigate("/batches")}
              variant="ghost"
              className="text-primary cursor-pointer hover:text-white"
            >
              View All →
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Batch Code
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Owner
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockBatches.slice(0, 5).map((batch, index) => (
                  <motion.tr
                    key={batch.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="border-b border-border/30 hover:bg-accent/10 transition-colors cursor-pointer group/row"
                    onClick={() => navigate(`/batches/${batch.id}`)}
                  >
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-primary">
                        {batch.batchCode}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium">{batch.product}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">
                        {batch.owner}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          statusColors[batch.status]
                        }`}
                      >
                        {batch.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">
                        {new Date(batch.timestamp).toLocaleDateString()}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="fixed bottom-8 right-8"
      >
        <Button
          onClick={() => navigate("/batches/create")}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300 group"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </Button>
      </motion.div>

      {isConnected && !isAuthenticated && <VerifyOwnershipModal />}
    </div>
  );
};

export default Dashboard;
