export interface Organization {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;

  type: string; // FARM, FACTORY, DISTRIBUTOR...

  created_at: string;
  updated_at: string;
}
