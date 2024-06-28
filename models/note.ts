import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema(
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

const Note = models.Note || model("Note", NoteSchema);

export default Note;
