import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});

mongoose.connect('mongodb://localhost:27017/passport')
    .then(() => console.log('mongodb connected'))
    .catch((err) => console.log('err'));

