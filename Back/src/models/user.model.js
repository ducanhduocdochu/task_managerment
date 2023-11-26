"use strict";
const { model, Schema, Types } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

// Declare the Schema of the Mongo model
var userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    boards: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Board",
        },
      ],
      default: [],
    },
    refresh_token: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);
