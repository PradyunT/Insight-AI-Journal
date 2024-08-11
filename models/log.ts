import { Schema, model, models } from "mongoose";

const logSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const log = models.log || model("Log", logSchema);

export default log;
