const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  projectId: { type: String, required: true },
});

customerSchema.set("toJSON", {
  transform: (document, returnObject) => {
    delete returnObject.hashedPassword;
  },
});

module.exports = mongoose.model("Customer", customerSchema);
