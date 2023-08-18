import mongoose from "mongoose";
import autoIncrement from "mongoose-plugin-autoinc";

const { autoIncrementFactory } = autoIncrement;

const EntrySchema = new mongoose.Schema(
  {
    entryId: {
      type: Number,
      unique: true,
      required: true,
    },
    personName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    presentType: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
      //   required: true,
    },
    gift: {
      type: String,
      //   required: true,
    },
    eventId: {
      type: Number,
      required: true,
    },
  }
  // { timestamps: true }
);

EntrySchema.plugin(autoIncrement.plugin, {
  model: "Entry",
  field: "entryId",
  startAt: 1,
  incrementBy: 1,
});

const Entries = mongoose.model("Entries", EntrySchema);
export default Entries;
