class RateLimitter {
  constructor(options) {
    this.options = options;
    this.rateLimits = new Map();
    this.options.limits.forEach((limit) => {
      this.rateLimits.set(limit.name, {
        limit: limit.limit,
        remaining: limit.limit,
        reset: Date.now() + limit.duration,
      });
    });
  }
  get(name) {
    return this.rateLimits.get(name);
  }
  set(name, limit) {
    this.rateLimits.set(name, limit);
  }
  consume(name) {
    const limit = this.get(name);
    if (limit) {
      limit.remaining--;
      this.set(name, limit);
    }
  }
  isAllowed(name) {
    const limit = this.get(name);
    if (limit) {
      if (limit.remaining > 0) {
        return true;
      } else if (limit.reset > Date.now()) {
        return false;
      } else {
        limit.remaining = limit.limit;
        limit.reset = Date.now() + limit.duration;
        this.set(name, limit);
        return true;
      }
    }
    return true;
  }
}
