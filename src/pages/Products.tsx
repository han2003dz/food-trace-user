import { useGetListProductsByOwner } from "@/hooks/useProducts";
import { LoadingProducts } from "@/components/pages/products/LoadingProducts";
import { ErrorLoadProducts } from "@/components/pages/products/ErrorLoadProducts";
import { ProductList } from "@/components/pages/products/ProductsList";

const ProductManagement = () => {
  const { data: products, isLoading, error } = useGetListProductsByOwner();

  // Loading state
  if (isLoading) {
    <LoadingProducts />;
  }

  // Error state
  if (error) {
    <ErrorLoadProducts error={error} />;
  }

  return <ProductList products={products} isLoading={isLoading} />;
};

export default ProductManagement;
