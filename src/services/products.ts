import { api } from "@/config/api";
import type { CreateProductFormData } from "@/types/form";

export const createProducts = async (data: CreateProductFormData) => {
  const res = await api().post("/products/create", data);
  return res.data;
};

export const getListProducts = async () => {
  const res = await api().get("/products");
  return res.data;
};

export const getListProductsByOwner = async () => {
  const res = await api().get("/products/my");
  return res.data;
};
