const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstname:{

        type:String,
        required:true
    },
    lastname:{

        type:String
    },
    email:{

        type:String,
        required:true
    },
    password:{

        type:String,
        required:true
    },
    accounttype:{

        type:String,
        required:true,
        enum:['Admin','Student','Instructor']
    },
    additionaldetails:{

        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profilemodel"

    },
    courses:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Coursemodel"
        }

    ],
    image:{

        type:String,
        required:true
    },
    uniquecode:{

        type:Number
    },
    expirationtimeofuniquecode:{

        type:Date

    },
    courseprogress:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Courseprogressmodel"
        }
    ],
    joined:{

        type:Date,
        default:Date.now()
    },
    totallogins:{

        type:Number,
        default:1

    }

})

module.exports = mongoose.model('Usermodel',userSchema);