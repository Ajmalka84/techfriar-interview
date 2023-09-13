const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    model : {
        type: String,
        required : true
    },
    manufacturer : {
        type: String,
        required : true
    },
    price : {
        type: Number,
        required : true
    },
    images : {
        type : Array,
        default : []
    }
})

module.exports = mongoose.model("vehicle" , vehicleSchema)