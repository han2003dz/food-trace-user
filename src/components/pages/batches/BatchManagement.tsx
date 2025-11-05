import { useState } from "react";
import { motion } from "framer-motion";

import { Search, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { mockBatches, statusColors } from "@/utils/mockData";

const BatchManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredBatches = mockBatches.filter((batch) => {
    const matchesSearch =
      batch.batchCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.owner.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || batch.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Batch Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage all food batches in the supply chain
          </p>
        </div>
        <Button onClick={() => navigate("/batches/create")} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Batch
        </Button>

        <Button onClick={() => navigate("/products/create")} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Product
        </Button>

        <Button
          onClick={() => navigate("/trace?batch=LOT-APPLE-VIET-NAM-2025-001")}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Detail
        </Button>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 flex-wrap"
      >
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search batches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50 border-border/50"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-card/50 border-border/50">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="created">Created</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="processed">Processed</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
        <div className="relative bg-glass-gradient backdrop-blur-xl border border-border/50 rounded-2xl p-6">
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
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Created Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBatches.map((batch, index) => (
                  <motion.tr
                    key={batch.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-border/30 hover:bg-accent/10 transition-all duration-200 cursor-pointer group/row"
                    onClick={() => navigate(`/batches/${batch.id}`)}
                  >
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-primary group-hover/row:text-secondary transition-colors">
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
                      <span className="text-sm text-muted-foreground">
                        {batch.category}
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
    </div>
  );
};

export default BatchManagement;
