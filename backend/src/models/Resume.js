import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Resume",
    },

    template: {
      type: String,
      default: "classic",
    },

    data: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
