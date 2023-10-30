import mongoose from "mongoose";
import { MONGO_URI } from "./env.config.js";

mongoose.connect(MONGO_URI)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("err"));