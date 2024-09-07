const mongoose = require("mongoose");
const Contractor = require("./Contractor");

const changeLogSchema = new mongoose.Schema({
   oldTaskDescription: String,
   newTaskDescription: String,
   oldStartDate: Date,
   newStartDate: Date,
   oldEndDate: Date,
   newEndDate: Date,
   oldCost: Number,
   newCost: Number,
   reviewStatus: { type: String, enum: ["Pending", "Approved", "Rejected"]},
},
   { timestamps: true },
);

const phaseSchema = new mongoose.Schema({
   phaseName: String,
   task: String,
   taskDescription: String,
   startDate: Date,
   endDate: Date,
   cost: Number,
   project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }, // reference taken from input
   contractor: {type: mongoose.Schema.Types.ObjectId, ref: "Contractor"},
   changeLog: [changeLogSchema],
});

module.exports = mongoose.model("Phase", phaseSchema);