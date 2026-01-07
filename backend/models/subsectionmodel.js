const mongoose = require("mongoose");

const subsectionSchema = new mongoose.Schema({

    title:{

        type:String
    },
    timeduration:{

        type:String
    },
    description:{

        type:String
    },
    videourl:{

        type:String

    },
    sectiontowhichitbelong:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Sectionmodel"

    }

})

module.exports = mongoose.model("SubSectionmodel",subsectionSchema);