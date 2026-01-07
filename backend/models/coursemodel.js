const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    coursename:{

        type:String
    },
    coursedescription:{

        type:String
    },
    whatyouwilllearn:{

        type:String
    },
    courselanguage:{

        type:String

    },
    teacher:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Usermodel"
    },
    coursecontent:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Sectionmodel"
        }
    ],
    ratingandreviews:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingandReviewsmodel"
        }
    ],
    price:{

        type:Number,
    },
    thumbnail:{

        type:String
    },
    createdat:{

        type:Date,
        default:Date.now()
        
    },
    category:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Categorymodel"
    },
    studentenrolled:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Usermodel"
        }
    ],
    status:{

        type:String,
        enum:["Private","Published"]
    }

})

module.exports = mongoose.model("Coursemodel",courseSchema);