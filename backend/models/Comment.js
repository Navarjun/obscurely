const mongoose = require('mongoose');
const methods = require('./model-methods');
const modelName = 'Comment';

const schema = new mongoose.Schema({
    text: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    votes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        default: []
    }
}, {timestamps: true});

let model = mongoose.model(modelName, schema);

methods(model, schema);

module.exports = schema;