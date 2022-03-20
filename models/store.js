const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name : {type: String, required: true, lowercase: true, trim: true},
  cuit : {type: Number, required: true, trim: true, minLength: 11, maxLength: 11},
  concepts : {type: [String], required: true, lowercase: true},
  currentBalance : {type: Number, required: true, trim: true},
  active : {type: Boolean, required: true, trim: true},
  lastSale : {type: Date, required: true, trim: true},
},{ timestamps: true });

StoreSchema.pre('save', async function (callback) {
  //completar de ser necesario
});

module.exports = mongoose.model('Store', StoreSchema);
