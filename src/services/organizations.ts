import { api } from "@/config/api";

export const createOrganization = async (payload: {
  name: string;
  org_type: string;
  location: string;
  metadata_uri?: string;
}) => {
  const res = await api().post("/organizations", payload);
  return res.data;
};

export const getOrganizationByUser = async () => {
  const res = await api().get("/organizations/my");
  return res.data;
};

export const getAllOrganizations = async () => {
  const res = await api().get("/organizations");
  return res.data;
};
