import {
  createOrganization,
  getAllOrganizations,
  getOrganizationByUser,
} from "@/services/organizations";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateOrganization = () => {
  return useMutation({
    mutationFn: createOrganization,
  });
};

export const useGetOrganizationByUser = () => {
  return useQuery({
    queryKey: ["organization-by-user"],
    queryFn: getOrganizationByUser,
    staleTime: 10 * 1000,
  });
};

export const useOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: () => getAllOrganizations(),
  });
};
