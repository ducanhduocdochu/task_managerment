'use strict'
const {model, Schema, Types} = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Column'
const COLLECTION_NAME = 'Columns'

// Declare the Schema of the Mongo model
var columnSchema = new Schema({
    title:{
        type:String,
        trim: true,
        maxLength: 150
    },
    tasks: {
        type: [
          {
            type: Schema.Types.ObjectId,
            ref: "Task",
          },
        ],
        default: [],
      },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, columnSchema);