const mongoose = require('mongoose');

const Roles = require('./role')
const Profile = require('./profile');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    otp: {
        type: Number
    }




})

//create cart after user is created
userSchema.post('save', async function (doc, next) {
    const profile = await Profile.findOne({ user: doc._id });
    if (!profile) {
        const newProfile = new Profile({
            user: doc._id
        });
        await newProfile.save();

        doc.profile = newProfile._id;
        await doc.save();
        next();
    }
    next()
},


module.exports = mongoose.model('User',userSchema));