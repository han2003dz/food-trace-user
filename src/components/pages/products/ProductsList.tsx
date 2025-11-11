import { Button } from "@/components/ui/Button";
import { Calendar, Filter, MapPin, Package, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { formatDate } from "@/utils/format";
import { useState } from "react";
import { CATEGORIES } from "@/mocks/categories";
import type { ProductListItem } from "@/types/products";

interface ProductListProps {
  products: ProductListItem[];
  isLoading: boolean;
}

export const ProductList = ({ products, isLoading }: ProductListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const navigate = useNavigate();

  const filteredProducts =
    products?.filter((product: ProductListItem) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.origin?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.producer_name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        String(product.category_id) === String(categoryFilter);

      return matchesSearch && matchesCategory;
    }) || [];

  // const categories = Array.from(new Set(mockProducts.map((p) => p.category)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your products in the system
          </p>
        </div>
        <Button onClick={() => navigate("/products/create")} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Product
        </Button>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4"
      >
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50 border-border/50"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px] bg-card/50 border-border/50">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {filteredProducts.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {searchQuery || categoryFilter !== "all"
              ? "No products found"
              : "No products yet"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || categoryFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Create your first product to get started"}
          </p>
          {!searchQuery && categoryFilter === "all" && (
            <Button
              onClick={() => navigate("/products/create")}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Create First Product
            </Button>
          )}
        </motion.div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product: ProductListItem, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative group cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
              <div className="relative bg-glass-gradient backdrop-blur-xl border border-border/50 rounded-2xl p-6 h-full flex flex-col">
                {/* Product Image */}
                {product.image_url && (
                  <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-muted/20">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/400x300?text=No+Image";
                      }}
                    />
                  </div>
                )}

                {/* Product Info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Producer Info */}
                  {product.producer_name && (
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground line-clamp-1">
                        {product.producer_name}
                      </span>
                    </div>
                  )}

                  {/* Origin */}
                  {product.origin && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {product.origin}
                      </span>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      MFG: {formatDate(product.manufacture_date)}
                    </span>
                  </div>

                  {product.expiry_date && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        EXP: {formatDate(product.expiry_date)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                  {product.category_id && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      <p className="font-medium">
                        {CATEGORIES.find(
                          (cat) => String(cat.id) === product.category_id
                        )?.name
                          ? CATEGORIES.find(
                              (cat) => String(cat.id) === product.category_id
                            )?.name
                          : "N/A"}
                      </p>
                    </span>
                  )}

                  {/* Certifications Count */}
                  {product.certifications &&
                    product.certifications.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {product.certifications.length} certification
                        {product.certifications.length !== 1 ? "s" : ""}
                      </span>
                    )}

                  {/* Created Date */}
                  {product.created_at && (
                    <span className="text-xs text-muted-foreground">
                      Added {formatDate(product.created_at)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
