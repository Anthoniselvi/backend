import express from "express";
import {
  postProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "../controllers/profile.js";

const router = express.Router();

router.post("/add", postProfile);
router.get("/all", getAllProfiles);
router.get("/:profileId", getProfileById);
router.put("/:profileId", updateProfile);

export default router;
