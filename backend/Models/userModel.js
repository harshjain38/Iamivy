const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const wysaUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'User must have a name.'],
    },
    email: {
        type: String,
        required: [true,'User must have an email.'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "unpaid"
    },
    session_count: {
        type: Number,
        default: 0
    }
});

wysaUserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

wysaUserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const wysaUser = new mongoose.model("wysaUser", wysaUserSchema);
module.exports = wysaUser;