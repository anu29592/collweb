var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CollegeEventsSchema = new Schema({

	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: "Title cannot be blank"
	},
	branch: {
		type: String,
		default: '',
		trim: true,
		required: "Branch name cannot be blank"
	},
	description: {
		type: String,
		default: '',
		trim: true,
		required: "Please enter description about the event!"
	},
	comment: {
		type: String,
		default: '',
		trim: true
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	completed: {
		type: Boolean,
		default: false
	}
});

mongoose.model("CollegeEvents", CollegeEventsSchema);