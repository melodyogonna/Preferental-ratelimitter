import LimitterDAO from "./DAO";

/** A rate-limiter that can be used to throttle requests using the token bucket algorithm
 * @param {string} associatedKey - The key to associate with the limiter, this is what the user is tied to
 */
export default class LimitManager {
  tokens: number = 0;
  associationKey: string;

  constructor(associationKey: string) {
    this.associationKey = associationKey;
    this.getTokens();
  }

  canMakeRequest() {
    return this.tokens > 0;
  }

  /**
   * Consumes a token from the token bucket
   */
  async consumeToken() {
    this.tokens -= 1;
    await LimitterDAO.updateBucket(this.associationKey, this.tokens);
  }

  /**
   * Gets the number of tokens from the database
   */
  private async getTokens() {
    const bucket = await LimitterDAO.getBucket(this.associationKey);
    this.tokens = bucket.tokens;
  }

  async refillBucket(tokenSize: number) {
    this.tokens += tokenSize;
    await LimitterDAO.updateBucket(this.associationKey, this.tokens);
  }
}
