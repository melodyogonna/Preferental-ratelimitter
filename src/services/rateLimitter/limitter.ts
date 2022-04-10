import bucket from "../../models/bucket";

/** A rate-limiter that can be used to throttle requests using the token bucket algorithm */
export default class RateLimitter {
  tokens: number = 0;

  associationKey: string;

  constructor(associationKey: string) {
    this.associationKey = associationKey;
    this.tokens;
  }

  /**
   * Returns true if the limitter can make a request, false otherwise
   */
  canMakeRequest() {
    const now = Date.now();
    const delta = now - this.lastRefill;
    if (delta > 1000) {
      this.lastRefill = now;
      this.tokens = Math.min(
        this.maxTokens,
        this.tokens + (delta * this.tokensPerSecond) / 1000
      );
    }
    return this.tokens > 0;
  }

  /**
   * Consumes a token from the limitter
   */
  consumeToken() {
    this.tokens--;
  }

  private getTokens() {
    return bucket.get(this.associationKey).tokens;
  }
}
