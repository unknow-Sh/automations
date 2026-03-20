import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    type: {
      type: String,
      enum: ["task_assigned", "mention", "status_change"],
    },

    message: String,

    isRead: {
      type: Boolean,
      default: false,
    },

    relatedId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true },
);

notificationSchema.index({ user: 1, isRead: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
