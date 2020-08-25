const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
//const v = require("validator")

const UserSchema = new Schema(

    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        role: { type: String }
    }
)
UserSchema.statics.findByEmailAndPassword = async (email, password) => {
    const user = await UserModel.findOne({ email })
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) return user
    } else {
        return null
    }

}
UserSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel