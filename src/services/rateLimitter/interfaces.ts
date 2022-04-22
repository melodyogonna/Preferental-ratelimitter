export interface bucketInterface {
  tokens?: number;
  identificationAccessKey?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface createUpdateBucketInterface {
  tokens: number;
  identificationAccessKey: string;
}
