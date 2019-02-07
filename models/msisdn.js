const mongoose = require('mongoose');
const Schema = mongoose.Schema

const msisdnSchema = new Schema ({
    msisdn: {
        type: String
    },
    mno: {
        type: String
    },
});

const msisdnModel = mongoose.model('msisdn', msisdnSchema);

module.exports = msisdnModel;
