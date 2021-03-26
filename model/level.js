let mongoose = require('mongoose');

module.exports = mongoose.model('level',{
    name:{
        type:String
    },
    id:{
        type:String
    },
    mobile:{
        type:Number
    },
    right:[],
    left:[]
})