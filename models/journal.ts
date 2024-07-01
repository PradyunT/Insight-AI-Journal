import { Schema, model, models } from "mongoose";

const JournalSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Journal = models.Journal || model("Journal", JournalSchema);

export default Journal;
