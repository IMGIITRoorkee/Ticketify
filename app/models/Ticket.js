import mongoose, { mongo, Schema } from "mongoose";
let Ticket;
try {
  if (process.env.MONGODB_URI === undefined) {
    throw new Error("MONGODB_URI is not defined");
  }
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    
    
    mongoose.Promise = global.Promise;
    
    const ticketSchema = new Schema(
      {
        title: String,
        description: String,
        category: String,
        priority: Number,
        progress: Number,
        status: String,
        active: Boolean,
      },
      {
        timestamps: true,
      }
    );
    
    Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
    
  } catch (err) {
    console.log(err);
    Ticket = null;
  }
  
  export default Ticket;

