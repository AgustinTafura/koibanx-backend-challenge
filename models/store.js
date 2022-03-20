const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name: String,
  cuit: String,
  concepts: Array,
  currentBalance: Number,
  active: Boolean,
  lastSale: Date,
},{ timestamps: true });

StoreSchema.pre('save', async function (callback) {
  //completar de ser necesario
  let store = this;
  console.log(store)

});

module.exports = mongoose.model('Store', StoreSchema);
