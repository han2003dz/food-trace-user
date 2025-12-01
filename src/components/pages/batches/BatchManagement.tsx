import { useState } from "react";
import { motion } from "framer-motion";

import { Search, Filter, Plus, Loader2 } from "lucide-react";
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
import { useGetBatchByUser } from "@/hooks/useBatch";
import { statusColors } from "@/constants/batch";
import { getCategoryName } from "@/utils/categories";

const BatchManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data: batches, isLoading, error } = useGetBatchByUser();

  if (isLoading) return <Loader2 />;
  if (error) return <p>Không thể tải danh sách lô hàng</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Lô hàng</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý tất cả các lô hàng trong chuỗi cung ứng
          </p>
        </div>
        <Button onClick={() => navigate("/batches/create")} className="gap-2">
          <Plus className="w-4 h-4" />
          Tạo Lô hàng
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
            placeholder="Tìm kiếm lô hàng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50 border-border/50"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-card/50 border-border/50">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="created">Đã tạo</SelectItem>
            <SelectItem value="in_transit">Đang vận chuyển</SelectItem>
            <SelectItem value="processed">Đã xử lý</SelectItem>
            <SelectItem value="delivered">Đã giao</SelectItem>
            <SelectItem value="verified">Đã xác minh</SelectItem>
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
                    Mã Lô hàng
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Sản phẩm
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Chủ sở hữu
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Danh mục
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Trạng thái
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Ngày tạo
                  </th>
                </tr>
              </thead>
              <tbody>
                {batches?.map((batch, index) => (
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
                        {batch?.metadata?.initial_data_raw.batch_code}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-medium">{batch.product.name}</span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">
                        {batch.current_owner.name}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">
                        {getCategoryName(batch.product.category)}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          statusColors[batch.status]
                        }`}
                      >
                        {batch.status
                          .replace("_", " ")
                          .replace("created", "Đã tạo")
                          .replace("in transit", "Đang vận chuyển")
                          .replace("processed", "Đã xử lý")
                          .replace("delivered", "Đã giao")
                          .replace("verified", "Đã xác minh")}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">
                        {new Date(batch.created_at).toLocaleDateString()}
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
