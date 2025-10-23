import { api } from "@/config/api";
import type { IUser } from "@/types/auth";

export const getUserProfile = async () => {
  const data = await api().get<{ data: IUser }>(`/user/me`);
  return data.data.data;
};
