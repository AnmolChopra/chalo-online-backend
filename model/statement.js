let mongoose = require('mongoose');

module.exports = mongoose.model('statement',{
    mobile:{
        type:Number
    },
    name:{
        type:String
    },
    id:{
        type:String
    },
    date:{
        type:String,
        'default':Date.now()
    },
    remark:{
        type: String
    },
    tranT:{
        type: String
    },
    amt:{
        type: Number
    },
    sponserId:{
        type:String
    },
    lastBal:{
        type: Number
    }
})