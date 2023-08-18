import mongoose from "mongoose";
import autoIncrement from "mongoose-plugin-autoinc";

const { autoIncrementFactory } = autoIncrement;

const EventSchema = new mongoose.Schema(
  {
    eventId: {
      type: Number,
      unique: true,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: ["wedding", "birthday", "baby", "house", "others"],
    },
    name: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    profileId: {
      type: String,
      required: true,
    },
    eventImage: {
      type: String,
      required: true,
    },
  }
  // { timestamps: true }
);

EventSchema.plugin(autoIncrement.plugin, {
  model: "Event",
  field: "eventId",
  startAt: 1,
  incrementBy: 1,
});

EventSchema.pre("save", function (next) {
  if (this.eventType === "wedding") {
    this.eventImage =
      "https://img.freepik.com/free-photo/wedding-ritual-putting-ring-finger-india_8353-10048.jpg?w=740&t=st=1682678571~exp=1682679171~hmac=7c05683067e72d674d6263eecbc5be6af41c4ad1db06dc0277f769442f568bb1";
  } else if (this.eventType === "birthday") {
    this.eventImage =
      "https://img.freepik.com/free-vector/realistic-style-happy-birthday-background_52683-20020.jpg?w=740&t=st=1682679779~exp=1682680379~hmac=c44e92a2cc72350472492b9dfcf7b0ab2275d02ba930a42d4d787802bfa50bea";
  } else if (this.eventType === "baby") {
    this.eventImage =
      "https://img.freepik.com/free-photo/toddler-girl-lying-hammock_1304-4247.jpg?w=740&t=st=1682678314~exp=1682678914~hmac=39c34bec2e8e034021cdc0ad43d0e5220fb1b1df75b153388f00b928a87ca9f8";
  } else if (this.eventType === "house") {
    this.eventImage =
      "https://img.freepik.com/free-photo/real-estate-with-house-model-keys_1150-17814.jpg?w=740&t=st=1682678379~exp=1682678979~hmac=cb52701560dc4cea5d62005727367f9d4eb4859b974635d078efb41b0f6ecd94";
  } else {
    this.eventImage =
      "https://as2.ftcdn.net/v2/jpg/02/64/66/51/1000_F_264665107_zvaQgjCKLzcvxaRVYPIkFKr1Hj2kF955.jpg";
  }
  next();
});

const Events = mongoose.model("Events", EventSchema);
export default Events;
