const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  name: {type: String, required: true},
  contact: {type: String, required: true},
  email: {type: String, required: true},
  company: {type: String, required: true},
  registrationNumber: String,
});

contractorSchema.set("toJSON", {
  tranform: (document, returnObject) => {
    delete returnObject.hashPassword;
  },
});


module.exports = mongoose.model("Contractor", contractorSchema);