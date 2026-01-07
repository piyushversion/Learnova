const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({

    sectionname:{

        type:String
    },
    subsection:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSectionmodel"
        }
    ]

})

module.exports = mongoose.model("Sectionmodel",sectionSchema);