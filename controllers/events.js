import Events from "../models/Events.js";
import Entries from "../models/Entries.js";

export const postEvent = (req, res) => {
  const eventType = req.body.eventType;
  const name = req.body.name;
  const place = req.body.place;
  const date = req.body.date;
  const profileId = req.body.profileId;

  const newEvent = new Events({
    eventType,
    name,
    place,
    date,
    profileId,
  });

  if (eventType === "wedding") {
    newEvent.eventImage =
      "https://img.freepik.com/free-photo/wedding-ritual-putting-ring-finger-india_8353-10048.jpg?w=740&t=st=1682678571~exp=1682679171~hmac=7c05683067e72d674d6263eecbc5be6af41c4ad1db06dc0277f769442f568bb1";
  } else if (eventType === "birthday") {
    newEvent.eventImage =
      "https://img.freepik.com/free-vector/realistic-style-happy-birthday-background_52683-20020.jpg?w=740&t=st=1682679779~exp=1682680379~hmac=c44e92a2cc72350472492b9dfcf7b0ab2275d02ba930a42d4d787802bfa50bea";
  } else if (eventType === "baby") {
    newEvent.eventImage =
      "https://img.freepik.com/free-photo/toddler-girl-lying-hammock_1304-4247.jpg?w=740&t=st=1682678314~exp=1682678914~hmac=39c34bec2e8e034021cdc0ad43d0e5220fb1b1df75b153388f00b928a87ca9f8";
  } else if (eventType === "house") {
    newEvent.eventImage =
      "https://img.freepik.com/free-photo/real-estate-with-house-model-keys_1150-17814.jpg?w=740&t=st=1682678379~exp=1682678979~hmac=cb52701560dc4cea5d62005727367f9d4eb4859b974635d078efb41b0f6ecd94";
  } else {
    newEvent.eventImage =
      "https://as2.ftcdn.net/v2/jpg/02/64/66/51/1000_F_264665107_zvaQgjCKLzcvxaRVYPIkFKr1Hj2kF955.jpg";
  }

  newEvent
    .save()
    .then(() => res.json("Event added"))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getAllEvents = (req, res) => {
  Events.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getEventByEventId = (req, res) => {
  const eventId = req.params.eventId; // Extract eventId from req.params
  Events.findOne({ eventId }) // Use eventId instead of _id
    .then((event) => {
      if (!event) {
        return res.status(404).json("Event not found");
      }
      res.json(event);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getEventsByProfileId = (req, res) => {
  const profileId = req.params.profileId;
  Events.find({ profileId: profileId })
    .then((events) => {
      if (!events || events.length === 0) {
        return res.status(404).json("Events not found");
      }
      res.json(events);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateEventByEventId = (req, res) => {
  const eventId = req.params.eventId; // Extract eventId from req.params
  Events.findOne({ eventId })
    .then((event) => {
      // event.profileId = req.body.profileId;
      event.eventType = req.body.eventType;
      event.name = req.body.name;
      event.place = req.body.place;
      event.date = req.body.date;
      // event.profileId = req.body.profileId;

      event
        .save()
        .then(() => res.json("Event updated"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

export const deleteEventByEventId = (req, res) => {
  const eventId = req.params.eventId; // Extract eventId from req.params

  // Delete all entries with matching eventId first
  Entries.deleteMany({ eventId: eventId })
    .then(() => {
      // Then delete the event itself
      Events.deleteOne({ eventId: eventId })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.status(404).json("Event not found");
          }
          res.json("Event and associated entries deleted successfully");
        })
        .catch((err) => res.status(400).json("Error deleting event: " + err));
    })
    .catch((err) => res.status(400).json("Error deleting entries: " + err));
};
