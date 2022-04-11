import DAO from "./dao";

import { bucketInterface } from "./interfaces";

/** A rate-limiter that can be used to throttle requests using the token bucket algorithm
 * @param {string} associatedKey - The key to associate with the limiter, this is what the user is tied to
 */
export default class LimitManager {
  private tokens: number = 0;
  private readonly associationKey: string;
  private bucket: bucketInterface = {};

  constructor(associationKey: string) {
    this.associationKey = associationKey;
  }

  canMakeRequest() {
    return this.tokens > 0;
  }

  /**
   * Consumes a token from the token bucket
   */
  async consumeToken() {
    this.tokens -= 1;
    await DAO.updateBucket(this.associationKey, this.tokens);
  }

  /**
   * Gets the number of tokens from the database
   */
  private async getBucket() {
    const bucket = await DAO.getBucket(this.associationKey);
    return bucket;
  }

  async refillBucket(tokenSize: number) {
    this.tokens += tokenSize;
    await DAO.updateBucket(this.associationKey, this.tokens);
  }

  get tokensRemaining() {
    return this.tokens;
  }

  async init() {
    const bucket = await this.getBucket();
    this.bucket = bucket;
    this.tokens = bucket.tokens;
  }
}
