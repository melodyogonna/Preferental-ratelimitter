import bucket from "../../models/bucket";

export default class DAO {
  public async getBucket(associationKey: string): Promise<bucket> {
    return await bucket.findOne({
      where: {
        name: associationKey,
      },
    });
  }

  public async createBucket(
    associationKey: string,
    tokens: number
  ): Promise<bucket> {
    return await bucket.create({
      name: associationKey,
      count: tokens,
    });
  }

  public async updateBucket(
    associationKey: string,
    tokens: number
  ): Promise<bucket> {
    return await bucket.update(
      {
        tokens,
      },
      {
        where: {
          name: associationKey,
        },
      }
    );
  }
}
