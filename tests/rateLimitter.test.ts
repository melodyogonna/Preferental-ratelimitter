import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";

import RateLimitter from "../src/services/rateLimitter";
import LimitManager from "../src/services/rateLimitter/rateLimitManager";
import DAO from "../src/services/rateLimitter/dao";

chai.use(chaiAsPromised);
describe("Tests for the rate limiting class", () => {
  afterEach(() => {
    sinon.restore();
  });
  it("Test limit manager canMakeRequest is called", () => {
    const limiter = new LimitManager("dummyKey");
    const stub = sinon.stub(limiter, "canMakeRequest").returns(true);
    const rateLimitter = new RateLimitter(limiter);
    expect(rateLimitter.canMakeRequest()).to.be.true;
    expect(stub.calledOnce).to.be.true;
  });

  it("Limiter is getting the tokens", async () => {
    const stub = sinon.stub(DAO, "getBucket").returns(
      Promise.resolve({
        tokens: 10,
        lastUpdated: new Date(),
      })
    );
    const limiter = new LimitManager("dummyKey");
    await limiter.init();
    expect(limiter.tokensRemaining).to.be.equal(10);
    expect(stub.calledOnce).to.be.true;
  });

  it("The token bucket can be refilled", async () => {
    const stub = sinon.stub(DAO, "updateBucket");
    const limiter = new LimitManager("dummyKey");
    await limiter.refillBucket(10);
    expect(limiter.tokensRemaining).to.be.equal(10);
    expect(stub.calledOnce).to.be.true;
  });
});

it("consumes the tokens", async () => {
  const updateBucketStub = sinon.stub(DAO, "updateBucket");
  const getBucketStub = sinon.stub(DAO, "getBucket").resolves({
    lastUpdated: new Date(),
    tokens: 10,
  });
  const limiter = new LimitManager("dummyKey");
  await limiter.init();
  await limiter.consumeToken();
  expect(limiter.tokensRemaining).to.be.equal(9);
  expect(getBucketStub.calledOnce).to.be.true;
  expect(updateBucketStub.calledOnce).to.be.true;
});
