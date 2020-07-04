import mongoose from "mongoose";
import podcastModel from "./podcastModel.js";

const db = {};

db.mongoose = mongoose;
db.podcast = podcastModel(mongoose);
db.url = process.env.MONGOURL;

export { db };
