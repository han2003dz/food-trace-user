export interface CreateBatchFormData {
  productName: string;
  description: string;
  categoryId: string;
  producerName: string;
  farmLocation?: string;
  origin: string;
  batchCode: string;
  manufactureDate?: Date;
  expiryDate?: Date;
}
