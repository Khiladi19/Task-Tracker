import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
  },
  tasks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Task" 
  }],
}, {
  timestamps: true,
});

export const Project = mongoose.model("Project", projectSchema);

