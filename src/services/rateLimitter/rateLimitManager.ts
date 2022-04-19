import DAO from "./dao";

import { bucketInterface } from "./interfaces";

/** A rate-limiter that can be used to throttle requests using the token bucket algorithm
 * @param {string} identificationAccessKey - The key to associate with the limiter, this is what the user is tied to
 */
export default class LimitManager {
  private tokens: number = 0;
  private identificationAccessKey: string;
  private bucket: bucketInterface | null = null;

  constructor() {
    this.identificationAccessKey = "";
  }

  canMakeRequest() {
    return this.tokens > 0;
  }

  /**
   * Consumes a token from the token bucket
   */
  async consumeToken() {
    this.tokens -= 1;
    await DAO.updateBucket(this.identificationAccessKey, this.tokens);
  }

  /**
   * Gets the number of tokens from the database
   */
  private async getBucket() {
    const bucket = await DAO.getBucket(this.identificationAccessKey);
    return bucket;
  }

  async refillBucket(tokenSize: number) {
    this.tokens += tokenSize;
    await DAO.updateBucket(this.identificationAccessKey, this.tokens);
  }

  async createBucket(tokenSize: number) {
    this.tokens = tokenSize;
    if (this.bucket) {
      throw new Error("Bucket already exists");
    }
    const bucket = await DAO.createBucket(
      this.identificationAccessKey,
      this.tokens
    );
    this.bucket = bucket;
  }

  get tokensRemaining() {
    return this.tokens;
  }

  async init(identificationAccessKey: string) {
    if (!identificationAccessKey) {
      throw new Error("identificationAccessKey is required");
    }
    this.identificationAccessKey = identificationAccessKey;
    const bucket = await this.getBucket();
    this.bucket = bucket;
    this.tokens = bucket.tokens;
  }
}
