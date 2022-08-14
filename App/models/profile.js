const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema ({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    phone: {
        type: String
    },
    country: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});



module.exports = mongoose.model('Profile',profileSchema);