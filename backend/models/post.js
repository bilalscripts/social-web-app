const mongoose = require('mongoose');
const { ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({

    title:{
        type: String,
        require: true
    },
    body:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        default: "No Picture"
    },
    postedBy:{
        type: ObjectId,
        ref: "User"
    }

})
mongoose.model('Post',postSchema);