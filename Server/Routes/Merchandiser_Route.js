const express = require('express');
const router =  express.Router();
const jwt = require('jsonwebtoken');
require('dotenv/config');
const {check, validationResult} = require('express-validator');

const Merchandiser = require('../Models/Merchandiser_Model')

//Fetch all merchandiser details
router.get('/', async (req, res) => {
    try{
        const merchandisers = await Merchandiser.find()
        res.json(merchandisers)
    }
    catch(err){
        err => res.status(400).json('Error'+ err)
    } 
});

//Fetch a single merchandiser detail

router.get('/:_id', async (req, res) => {
    try{
        const merchandiser = await Merchandiser.findById(req.params._id);
        res.json(merchandiser)
    }
    catch(err){
        res.status(400).json('Error' + err)
    }
});

//Create new merchandiser
 router.post('/', [
     check('name', 'Name is required').not().isEmpty(),
     check('location', 'Please enter a location').not().isEmpty(),
     check('code', 'Please enter your code').not().isEmpty(),
    ], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }
    const {name, location, code} = req.body;

    try{

        let merchandiser = await Merchandiser.findOne({name, location});

        if(merchandiser){
            res.status(400).json({message: 'User already exists'});
        }
        merchandiser = new Merchandiser({
        name,
        location,
        code
        });
        await merchandiser.save();
       
        const payload = {
            distributor:{
                id: distributor.id
            }
        }
        jwt.sign(payload, process.env.jwtSecret, {
            expiresIn: 36000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
    }
    catch(err){
        res.status(500).json({message: err})
    };

});

module.exports = router;