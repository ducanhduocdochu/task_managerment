"use strict";
const { model, Schema, Types } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "Board";
const COLLECTION_NAME = "Boards";

// Declare the Schema of the Mongo model
var boardSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    columns: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Column",
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
module.exports = model(DOCUMENT_NAME, boardSchema);
