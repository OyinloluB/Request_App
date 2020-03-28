const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Request = require('../Models/Request_Model');

router.get('/', async (req, res) => {

    try{
        const requests = await Request.find()
        res.json(requests)
    }
    catch(err){
       err => res.status(400).json('Error'+ err )
    } 
});

router.get('/:_id', async (req, res) => {
    
    try{
        const requests = await Request.findById()
        res.json(requests)
    }
    catch(err){
        err => res.status(400).json('Error' + err)
    }
} )

router.post('/', [
    check('brand', 'Please select a brand').not().isEmpty(),
    check('sku', 'Select SKU').not().isEmpty(),
    check('volume', 'Please select volume').not().isEmpty(),
    check('quantity', 'Please enter the quantity needed').not().isEmpty()
    ], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }
    const { brand, sku, volume, quantity } = req.body;

    try{
        const requests = new Request({
        brand,
        sku,
        volume,
        quantity
        });

        await requests.save()
    }
    catch(err){
        err => res.status(500).json('Error' + err)
    }
})
 module.exports = router;