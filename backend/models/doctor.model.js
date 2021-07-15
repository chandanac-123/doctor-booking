const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    doctorId:{type:Number ,required:true},
    doctorName:{
        type:String,
        require:true,
        trim:true,
        minlength:3
    },
    department:{type:String , required:true},
},{
    timestamps : true,
});

const Doctor = mongoose.model('Doctor',doctorSchema);

module.exports = Doctor;
