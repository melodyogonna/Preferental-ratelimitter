import LimitManager from "./rateLimitManager";

/** A rate-limiter that can be used to throttle requests using the token bucket algorithm */
export default class RateLimiter {
  private limitManager;
  constructor(limitManager: LimitManager) {
    this.limitManager = limitManager;
  }

  /**
   * Returns true if the limiter can make a request, false otherwise
   */
  canMakeRequest(): boolean {
    return this.limitManager.canMakeRequest();
  }

  /**
   * Refills the token bucket
   */
  async refillBucket(tokenSize: number): Promise<void> {
    this.limitManager.refillBucket(tokenSize);
  }

  /**
   * consumes a token from the token bucket
   */
  async consumeToken(): Promise<void> {
    this.limitManager.consumeToken();
  }

  /**
   * Returns the current number of tokens in the bucket
   */
  getCurrentTokens(): number {
    return this.limitManager.tokensRemaining;
  }

  /** Create a new bucket with the given size */
  createBucket(tokenSize: number): void {
    this.limitManager.createBucket(tokenSize);
  }

  async init(): Promise<void> {
    await this.limitManager.init();
  }
}
