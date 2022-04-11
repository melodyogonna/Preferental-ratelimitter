import bucket from "../../models/bucket";

export default class DataLimitterDAO {
  static async getBucket(associationKey: string) {
    return bucket.findOne({
      where: {
        name: associationKey,
      },
    });
  }

  static async createBucket(associationKey: string, tokens: number) {
    return bucket.create({
      name: associationKey,
      tokens,
    });
  }

  static async updateBucket(associationKey: string, tokens: number) {
    return bucket.update(
      {
        tokens,
      },
      {
        where: {
          association_key: associationKey,
        },
      }
    );
  }
}
