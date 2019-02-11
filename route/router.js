const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('../config/config');
const msisdnModel = require('../models/msisdn');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname+'.csv');
    }
  });

const upload = multer({ storage: storage })

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Uploading an msisdn file

router.post('/msisdn', upload.single('test'), (req, res) => {
    const filePath = './uploads/test.csv';

    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            return console.log("Unable to read file " + err);
        }   
       let ourArrayBody = [];
       const dataLine = data.split('\n');
       dataLine.forEach(element => {
           const msisdn = element.split(',')[0];
           const mno = element.split(',')[1];
           const newModel = new msisdnModel({
               msisdn,
               mno
           });
           newModel.save()
           .then( data => {
               ourArrayBody.push(data);
               console.log(data);
               })
           .catch( err => {
               console.log(err)
           });      
       });
    });
    return res.send({
        error: false,
        status: 200,
        message: 'Saved successfully'
    })
          
});


// Posting individual msisdn

router.post('/indmsisdn', (req, res) => {
    const msisdn = req.body.msisdn
    const mno = req.body.mno
    console.log('msisdn', msisdn);
    console.log('mno', mno)
    msisdnModel.create({
        msisdn,
        mno
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

// Deleting an msisdn data

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

// Fetching an msisdn data

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



// Updating an msisdn data

router.put('/msisdn/:msisdn', (req, res) => {
    const msisdn = req.params.msisdn;
    let query = { 'msisdn': msisdn }
    const msisdnToUpdateBy = req.body.msisdn;
    let update = {
        $set: {
            msisdn: msisdnToUpdateBy
        }
    }
    let options = { upsert: true }
    msisdnModel.findOneAndUpdate (query, update, options, (err, data) => {
        console.log('Error occured while updating', err);
        console.log('Data returned from Updating', data)
        if (err) {
            return res.send({
                code: 400,
                error: true,
                message: 'Unable to update msisdn'
            })
        }
            return res.send({
                code: 202,
                error: false,
                message: 'msisdn updated successfully'
            })
    })
});

module.exports = router;