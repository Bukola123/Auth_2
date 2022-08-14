const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema ({

    name: {
        type: String,
        required: true
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



module.exports = mongoose.model('Role',roleSchema);