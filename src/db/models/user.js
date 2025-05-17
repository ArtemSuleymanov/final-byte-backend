import { model, Schema } from "mongoose";

import { emailRegexp } from "../../constants/auth.js";

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const UsersCollection = model("users", usersSchema);
