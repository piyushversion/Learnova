const mongoose = require("mongoose");

const courseprogressSchema = new mongoose.Schema({

    courseid:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Coursemodel"
    },
    userid:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Usermodel"

    },
    completedvideos:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSectionmodel"
        }
    ]
})

module.exports = mongoose.model("Courseprogressmodel",courseprogressSchema);