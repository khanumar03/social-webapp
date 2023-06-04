const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    imgsrc: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    Like: [{type: mongoose.Schema.ObjectId, ref: "User"}],
    Comment: [{
        commentBy: {
            type: String,
        },
        comment: {type: String}
    }],
    postedby: {
        type:ObjectId,
        ref:"User",
    }
});
mongoose.model("Post",postSchema)