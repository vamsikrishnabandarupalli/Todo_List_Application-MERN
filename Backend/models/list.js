const mongoose = require('mongoose');
const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
    ],
    createdAt: { 
        type: Date, default: Date.now 
    }
},
{timestamps: true}
);

module.exports = mongoose.model('List', listSchema);