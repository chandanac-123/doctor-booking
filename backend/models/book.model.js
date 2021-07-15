const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bookingId:{type:Number , required:true},
    doctorId:{type:Number , required:true},
    name: { type : String, required:true},
    age: { type : Number, required : true},
    date: { type : Date , required : true},
    phone:{ type:Number , required:true},
    },{
    timestamps : true,
});

const Booking = mongoose.model('Booking',bookingSchema);

module.exports = Booking;