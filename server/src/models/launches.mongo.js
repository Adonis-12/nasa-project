const mongoose = require('mongoose')

const launchesSchema = new mongoose.Schema({
    flightNumber:{
        type:Number,
        required:true,
        default:1
    },
    mission:{
        type:String,
        required:true,
    },
    target:{
        type:String,
        required:true
    },
    rocket:{
        type:String,
        required:true
    },
    customer:[],
    launchDate:{
        type:Date,
        required:true
    },
    rocketType:{
        type:String,
        required:true
    },
    upcoming:{
        type:Boolean,
        required:true,
        default:true
    },
    success:{
        type:Boolean,
        required:true,
        default:true
    }
})


module.exports = mongoose.model('Launch',launchesSchema)