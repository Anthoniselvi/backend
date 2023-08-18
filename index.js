import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import profileRoutes from "./routes/profile.js";
import eventsRoutes from "./routes/events.js";
import entriesRoutes from "./routes/entries.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Welcome to Moi App");
// });
app.use("/profile", profileRoutes);
app.use("/events", eventsRoutes);
app.use("/entries", entriesRoutes);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Runnig Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
