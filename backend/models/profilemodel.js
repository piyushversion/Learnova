const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    gender:{

        type:String
    },
    dateofbirth:{

        type:String
    },
    about:{

        type:String
    },
    contactnumber:{

        type:String
    }

})

module.exports = mongoose.model('Profilemodel',profileSchema);