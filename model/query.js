let mongoose = require('mongoose');

module.exports = mongoose.model('query',{
    userId:{
        type:String
    },
    queryT:{
        type:String
    },
    query:{
        type:Number
    },
    qStatus:{
        type:String
    }
})