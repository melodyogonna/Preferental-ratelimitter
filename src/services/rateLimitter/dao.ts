import bucket from "../../models/bucket";

export default class DataLimitterDAO {
  static async getBucket(identificationAccessKey: string) {
    return bucket.findOne({
      identification_access_key: identificationAccessKey,
    });
  }

  static async createBucket(identificationAccessKey: string, tokens: number) {
    return bucket.create({
      identification_access_key: identificationAccessKey,
      tokens,
    });
  }

  static async updateBucket(identificationAccessKey: string, tokens: number) {
    return bucket.updateOne(
      {
        identification_access_key: identificationAccessKey,
      },
      {
        tokens,
      }
    );
  }
}
