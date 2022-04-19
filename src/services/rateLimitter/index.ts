import RateLimitManager from "./rateLimitManager";

/** A rate-limiter that can be used to throttle requests using the token bucket algorithm */
export default class RateLimiter {
  private readonly rateLimitManager;

  constructor(rateLimitManager: RateLimitManager) {
    this.rateLimitManager = rateLimitManager;
  }

  /**
   * Returns true if the limiter can make a request, false otherwise
   */
  canMakeRequest(): boolean {
    return this.rateLimitManager.canMakeRequest();
  }

  /**
   * Refills the token bucket
   */
  async refillBucket(tokenSize: number): Promise<void> {
    await this.rateLimitManager.refillBucket(tokenSize);
  }

  /**
   * consumes a token from the token bucket
   */
  async consumeToken(): Promise<void> {
    await this.rateLimitManager.consumeToken();
  }

  /**
   * Returns the current number of tokens in the bucket
   */
  getRemainingTokens(): number {
    return this.rateLimitManager.tokensRemaining;
  }

  /** Create a new bucket with the given size */
  async createBucket(tokenSize: number): Promise<void> {
    await this.rateLimitManager.createBucket(tokenSize);
  }

  async init(identificationAccessKey: string): Promise<void> {
    await this.rateLimitManager.init(identificationAccessKey);
  }
}
