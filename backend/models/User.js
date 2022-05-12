const mongoose = require('mongoose');
const methods = require('./model-methods');
const modelName = 'Person';

const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    profilePic: String
});

let model = mongoose.model(modelName, schema);

methods(model, schema);

module.exports = schema;