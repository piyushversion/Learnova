const mongoose = require("mongoose");

const ratingandreviewsSchema = new mongoose.Schema({

    userwhohasgivenrar:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Usermodel"
    },
    rating:{
        type:Number,
        required:true
    },
    reviews:{

        type:String,
        required:true
    },
    courseonwhichrargiven:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Coursemodel"
    },
    createdat:{

        type:Date,
        default:Date.now()

    }

})

module.exports = mongoose.model("RatingandReviewsmodel",ratingandreviewsSchema);