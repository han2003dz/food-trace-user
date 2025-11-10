import {
  createProducts,
  getListProducts,
  getListProductsByOwner,
} from "@/services/products";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useGetListProductsByOwner = () => {
  return useQuery({
    queryKey: ["products-by-owner"],
    queryFn: getListProductsByOwner,
  });
};
