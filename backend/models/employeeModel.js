const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required']
    },
    // profilePic has to be looked into, later

    mobile: {
        type: Number,
        required: [true, 'Mobile number is required']
    },
    jobType: {
        type: String,
        required: [true, 'Job type is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    dob: {
        type: Date,
        required: [true, 'DOB is required']
    },
    preferredLocation: {
        type: String,
        required: [true, 'Preferred location is required']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Employee', employeeSchema)