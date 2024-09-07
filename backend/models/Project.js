const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectId: {type: String, required: true, unique: true},
    startDate: Date,
    endDate: Date,
    projectAddress: String,
    projectPhaseCount: Number,
    projectDownPayment: Number,
    projectPaymentReceived: Number,
    projectTotalCost: Number,
    contractor: { type: mongoose.Schema.Types.ObjectId, ref: "Contractor" },
});

module.exports = mongoose.model("Project", projectSchema);
