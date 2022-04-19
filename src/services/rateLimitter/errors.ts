export class BucketExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BucketExistsError";
  }
}
