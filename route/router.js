const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('../config/config');
const msisdnModel = require('../models/msisdn');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// create an msisdn data

router.post('/msisdn', (req, res) => {
    const msisdn = req.body.msisdn
    const mno = req.body.mno
    console.log('msisdn', msisdn);
    console.log('mno', mno)
    msisdnModel.create({
        msisdn
    }).then((resp) => {
        console.log('Data was created', resp);
        return res.send({
            error: false,
            status: 200,
            message: 'Data was created successfully'
        })
    }).catch((err) => {
        console.log('Data was not created', err);
        return res.send({
            error: true,
            status: 400,
            message: 'Unable to create Data'
        });
    });
});

// Delete an msisdn data

router.delete('/msisdn/:msisdn', (req, res) => {
    const msisdn = req.params.msisdn
    console.log('msisdn', msisdn);
        msisdnModel.deleteOne({
        msisdn
        }).then((resp) => {
        console.log(resp);
        if (resp.n === 1){
            return res.send({
                error: false,
                status: 200,
                message: 'Data was deleted Successfully'
            })
        } else {
            return res.send({
                error: true,
                status: 400,
                message: 'Unable to delete data'
            })
        }
    }).catch((err) => {
        console.log(err);
    });
});

// Fetch an msisdn Data

router.get('/msisdn', (req, res) => {
    const msisdn = req.body.msisdn
    console.log('msisdn', msisdn);
    msisdnModel.findOne({
        msisdn
    }).then((resp) => {
        console.log(resp)
        if (resp) {
            return res.send({
                status: 200,
                error: false,
                message: 'The fetch was successful'
            })
        } else {
            return res.send({
                status: 400,
                error: true,
                message: 'Data not found'
            })
        }
    }).catch((err) => {
        console.log(err)
    });
});



// Update an msisdn data




module.exports = router