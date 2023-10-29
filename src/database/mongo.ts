import { connect } from "mongoose";

export const mongoDbConnection = () => {
    connect(`mongodb://localhost:27017/passport`)
        .then(() => console.log("mongodb connected"))
        .catch((err) => console.log("mongodb Error:", err));
};
