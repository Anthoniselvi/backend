import express from "express";
import {
  postEvent,
  getAllEvents,
  getEventByEventId,
  getEventsByProfileId,
  updateEventByEventId,
  deleteEventByEventId,
} from "../controllers/events.js";

const router = express.Router();

router.post("/add", postEvent);
router.get("/all", getAllEvents);
router.get("/single/:eventId", getEventByEventId);
router.get("/all/:profileId", getEventsByProfileId);
router.put("/edit/:eventId", updateEventByEventId);
router.delete("/delete/:eventId", deleteEventByEventId);

export default router;
