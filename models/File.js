import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    url: String,

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  },
  { timestamps: true },
);

const File = mongoose.model("File", fileSchema);

export default File;
