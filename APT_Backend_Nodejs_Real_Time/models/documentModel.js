const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
  users:{type: Map, of: String},
  nodes:[{
    position: Number,
    letter: String,
    uniqueIdentifier: String,
    tombstone: Boolean,
    italic: Boolean,
    bold: Boolean
  }]
});


const documentModel = mongoose.model('documents', documentSchema);

module.exports = documentModel;