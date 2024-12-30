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
        'Bug Fix',
        'MVP'
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
      enum: {
        values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        message: 'Progress must be one of the predefined values (e.g., 0, 10, 20, ..., 100)',
      }
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
