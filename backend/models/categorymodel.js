const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    name:{

        type:String,
        required:true
    },
    description:{

        type:String,
        required:true
    
    },
    courseswithparticularcategory:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Coursemodel"
        }
    ]

})

module.exports = mongoose.model("Categorymodel",categorySchema);