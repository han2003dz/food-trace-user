import { ROLE, ROLE_LABEL } from "@/constants/mapRole";

export function mapRoles(value: bigint | number) {
  const v = Number(value);
  const roles: string[] = [];

  (Object.keys(ROLE) as (keyof typeof ROLE)[]).forEach((key) => {
    if (v & ROLE[key]) roles.push(ROLE_LABEL[key]);
  });

  return roles;
}
