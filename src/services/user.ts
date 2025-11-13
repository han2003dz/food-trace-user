import { api } from "@/config/api";

export const getUserProfile = async () => {
  const data = await api().get(`/user/me`);
  return data.data;
};
