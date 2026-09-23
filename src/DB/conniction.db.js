import mongoose from "mongoose";
import { DB_URI } from "../config.js";
import { UserModel } from "./model/user.model.js";

export const bootstrapDB = async (app, port) => {
    try {
        await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 30000 });
        await UserModel.syncIndexes()
        console.log(`database connected successfully`);
        app.listen(port, () => console.log(`example work on port ${port}!! `))

    } catch (error) {
        console.log(error);

        console.log(`faild to connect to DB `);

    }
}