import mongoose from "mongoose";

const automationSchema = new mongoose.Schema({
  name: String,

  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace"
  },

  trigger: {
    type: String,
    enum: ["task_created", "task_completed", "task_updated"],
    required: true
  },

  conditions: {
    projectId: mongoose.Schema.Types.ObjectId,
    priority: String,
    assignedTo: mongoose.Schema.Types.ObjectId
  },

  actions: [
    {
      type: {
        type: String,
        enum: ["create_task", "send_email", "update_task"]
      }, 
      data: mongoose.Schema.Types.Mixed
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

automationSchema.index({ workspace: 1 });

const Automation = mongoose.model("Automation", automationSchema);

export default Automation;