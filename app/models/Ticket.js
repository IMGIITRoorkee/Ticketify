import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'], 
      unique: true, 
      trim: true, 
    },
    description: {
      type: String,
      required: [true, 'Description is required'], 
    },
    category: {
      type: String,
      required: [true, 'Category is required'], 
      enum: [
        'Hardware Problem',
        'Software Problem',
        'Application Development',
        'Project',
      ], 
    },
    priority: {
      type: Number,
      required: [true, 'Priority is required'], 
      min: [1, 'Priority must be at least 1'], 
      max: [5, 'Priority must be at most 5'],
    },
    progress: {
      type: Number,
      required: [true, 'Progress is required'], 
      min: [0, 'Progress must be at least 0'], 
      max: [100, 'Progress must be at most 100'],
    },
    status: {
      type: String,
      enum: ['not started', 'started', 'done'],
      default: 'not started', 
    },
    active: {
      type: Boolean,
      default: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;

