const mongoose = require('mongoose');
const Schema = mongoose.Schema

const msisdnSchema = new Schema ({
    msisdn: {
        type: String,
        type: String,
        required: true
    }
});

const msisdnModel = mongoose.model('msisdn', msisdnSchema);

module.exports = msisdnModel;