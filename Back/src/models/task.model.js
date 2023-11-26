"use strict";
const { model, Schema, Types } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "Task";
const COLLECTION_NAME = "Tasks";

// Declare the Schema of the Mongo model
var taskSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    subtasks: {
      type: {type: [
        {
          title: { type: String, required: true },
          isCompleted: { type: Boolean, default: false },
        },
      ], default: []},
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, taskSchema);
