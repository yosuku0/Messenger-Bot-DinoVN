import { model, Schema } from "mongoose";

const tool = model(
  "tool",
  new Schema({
    _id: String,
    nhay: Boolean,
  }),
);

export { tool };
