const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        unique: [true, "userName taken already"],
        required: [true, "username Cannot be empty"]


    }
    ,
    email: {
        type: String,
        lowercase: true,
        unique: [true, "email already taken"],
        required: [true, "email caannot be empty"],
        trim:true

    },
    password:{
        type:String,
        required:true,
        
    }
}, {
    timestamps: true
})


userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    return

})
userSchema.methods.comparePassword = async function (password) {  //mongoose method to compare the password from the database and the password from the user input
    
  return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model('users',userSchema)

module.exports = userModel;