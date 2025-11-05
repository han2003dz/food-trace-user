import { api } from "@/config/api";

interface CreateProductInput {
  name: string;
  origin: string;
  manufacture_date: string;
  expiry_date: string;
  image_url?: string;
  description?: string;
}

export const createProducts = async (data: CreateProductInput) => {
  const res = await api().post("/products/create", data);
  return res.data;
};

export const getListProducts = async () => {
  const res = await api().get("/products");
  return res.data;
};
