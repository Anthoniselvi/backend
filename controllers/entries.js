import Entries from "../models/Entries.js";
import Events from "../models/Events.js";

export const postEntry = (req, res) => {
  const personName = req.body.personName;
  const city = req.body.city;
  const presentType = req.body.presentType;
  const amount = req.body.amount || 0;
  const gift = req.body.gift || "";
  const eventId = req.body.eventId;

  const newEntry = new Entries({
    personName,
    city,
    presentType,
    amount,
    gift,
    eventId,
  });

  newEntry
    .save()
    .then(() => res.json("New Entry added"))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getAllEntries = (req, res) => {
  Entries.find()
    .then((entries) => res.json(entries))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getEntryByEntryId = (req, res) => {
  const entryId = req.params.entryId; // Extract eventId from req.params
  Entries.findOne({ entryId: entryId }) // Use eventId instead of _id
    .then((entry) => {
      if (!entry) {
        return res.status(404).json("Entry not found");
      }
      res.json(entry);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getAllEntriesByEventId = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const result = await Entries.find({ eventId: eventId });
    console.log("Matching Documents:", result);
    const entriesList = result;
    const totalAmount = entriesList.reduce((acc, doc) => acc + doc.amount, 0);
    console.log("Total Amount:", totalAmount);
    const totalGift = entriesList.filter((entry) => entry.gift !== "").length;
    console.log("Filled Gift Count:", totalGift);
    res.status(200).json({
      entriesList: entriesList,
      totalAmount: totalAmount,
      totalGift: totalGift,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllEntriesByProfileId = async (req, res) => {
  const profileId = req.params.profileId;
  try {
    const events = await Events.find({ profileId: profileId });
    const eventIds = events.map((event) => Number(event.eventId));
    const entriesList = await Entries.find({ eventId: { $in: eventIds } });
    console.log("Matching Documents:", entriesList);
    const totalAmount = entriesList.reduce((acc, doc) => acc + doc.amount, 0);
    console.log("Total Amount:", totalAmount);
    const totalGift = entriesList.filter((entry) => entry.gift !== "").length;
    console.log("Filled Gift Count:", totalGift);
    const maxAmountEntry = entriesList.reduce((acc, curr) =>
      acc.amount > curr.amount ? acc : curr
    );
    console.log("Max Amount Entry:", maxAmountEntry);
    const maxAmountEventList = await Events.findOne({
      eventId: maxAmountEntry.eventId,
    });
    console.log("Event List:", maxAmountEventList);
    res.status(200).json({
      entriesList: entriesList,
      totalAmount: totalAmount,
      totalGift: totalGift,
      maxAmountEntry: maxAmountEntry,
      maxAmountEventList: maxAmountEventList,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEntryByEntryId = (req, res) => {
  const entryId = req.params.entryId; // Extract eventId from req.params
  Entries.findOne({ entryId: entryId })
    .then((entry) => {
      entry.personName = req.body.personName;
      entry.city = req.body.city;
      entry.presentType = req.body.presentType;
      entry.amount = req.body.amount;
      entry.gift = req.body.gift;

      entry
        .save()
        .then(() => res.json("Entry updated"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

export const deleteEntryByEntryId = (req, res) => {
  const entryId = req.params.entryId; // Extract eventId from req.params
  Entries.deleteOne({ entryId: entryId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json("Entry not found");
      }
      res.json("Entry deleted successfully");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getTotals = async (req, res) => {
  const profileId = req.params.profileId;
  try {
    // Get all events for the given profileId
    const events = await Events.find({ profileId });

    // Get the eventIds for the events
    const eventIds = events.map((event) => event.eventId);

    // Loop through each eventId and calculate the total amount and gift count
    const eventTotals = [];
    for (const eventId of eventIds) {
      const result = await Entries.find({ eventId });
      const entriesList = result;
      const totalAmount = entriesList.reduce((acc, doc) => acc + doc.amount, 0);
      const totalGift = entriesList.filter((entry) => entry.gift !== "").length;

      // Find the event name for the current eventId
      const eventName = events.find((event) => event.eventId === eventId).name;
      const eventImage = events.find(
        (event) => event.eventId === eventId
      ).eventImage;

      eventTotals.push({
        eventId,
        eventName,
        eventImage,
        totalAmount,
        totalGift,
      });
    }

    console.log("Event Totals:", eventTotals);
    res.status(200).json(eventTotals);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
