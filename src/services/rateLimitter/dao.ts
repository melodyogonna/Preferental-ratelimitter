import bucket from "../../models/bucket";

export default class DataLimitterDAO {
  static async getBucket(associationKey: string) {
    return bucket.findOne({
      where: {
        identification_access_key: associationKey,
      },
    });
  }

  static async createBucket(associationKey: string, tokens: number) {
    return bucket.create({
      identification_access_key: associationKey,
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
          identification_access_key: associationKey,
        },
      }
    );
  }
}
