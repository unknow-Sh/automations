import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    action: {
      type: String,
      required: true,
    },

    entityType: {
      type: String,
      enum: ["task", "project", "workspace"],
    },

    entityId: mongoose.Schema.Types.ObjectId,

    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
);

activitySchema.index({ user: 1 });
activitySchema.index({ entityId: 1 });

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
