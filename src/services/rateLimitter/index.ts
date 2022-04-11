import LimitManager from "./limitter";

/** A rate-limiter that can be used to throttle requests using the token bucket algorithm */
export default class RateLimitter {
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
}
