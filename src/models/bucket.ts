import mongoose from "mongoose";

const { Schema } = mongoose;

const bucket = new Schema(
  {
    association_key: {
      type: String,
      required: true,
    },
    tokens: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bucket", bucket);
