import { createProducts, getListProducts } from "@/services/products";
import { useMutation } from "@tanstack/react-query";

export const useGetListProducts = () => {
  return useMutation({
    mutationFn: getListProducts,
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProducts,
  });
};
