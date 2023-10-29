import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/passport")
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("err"));