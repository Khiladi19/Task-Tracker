import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
