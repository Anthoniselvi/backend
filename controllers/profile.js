import Profiles from "../models/Profile.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const postProfile = (req, res) => {
  const profileId = req.body.profileId;
  const name = req.body.name;
  const email = req.body.email;
  const mobile = "";
  const age = "";
  const gender = "";
  const address = "";
  const city = "";

  const newProfile = new Profiles({
    profileId,
    name,
    email,
    mobile,
    age,
    gender,
    address,
    city,
  });

  newProfile
    .save()
    .then(() => res.json("Profile added"))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getAllProfiles = (req, res) => {
  Profiles.find()
    .then((profiles) => res.json(profiles))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getProfileById = (req, res) => {
  const profileId = req.params.profileId;
  Profiles.findOne({ profileId })
    .then((profile) => {
      if (!profile) {
        return res.status(404).json("Profile not found");
      }
      res.json(profile);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateProfile = (req, res) => {
  const profileId = req.params.profileId;
  Profiles.findOne({ profileId })
    .then((profile) => {
      profile.name = req.body.name;
      profile.mobile = req.body.mobile;
      profile.email = req.body.email;
      profile.age = req.body.age;
      profile.gender = req.body.gender;
      profile.address = req.body.address;
      profile.city = req.body.city;

      profile
        .save()
        .then(() => res.json("Profile updated"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
};
