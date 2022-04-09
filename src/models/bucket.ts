import mongoose from "mongoose";

const { Schema } = mongoose;

const bucket = new Schema(
  {
    association_key: {
      type: String,
      required: true,
    },
    remaining_requests: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bucket", bucket);
