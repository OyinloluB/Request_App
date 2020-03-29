const express = require('express');
const router =  express.Router();
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
require('dotenv/config');


const Distributor = require('../Models/Distributor_Model');

// Fetch all distributors
router.get('/', async (req, res) => {
    try{
        const distributors = await Distributor.find();
        res.json(distributors)
    }
    catch(err) {
        err => res.status(400).json('Error' + err)
    }
});

// Fetch a single distributor by id
router.get('/:_id', async (req, res) =>{
    try{
        const distributor = await Distributor.findById(req.params._id);
        res.json(distributor)
    }
    catch(err ){
        err => res.status(400).json('Error' + err)
    }
});

// Register a new distributor
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('location', 'Please enter a location').not().isEmpty(),
    ], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        }

    const { name, location } = req.body;

    try{
        let distributor = await Distributor.findOne({name, location});

        if(distributor) {
            res.status(400).json({message: 'User already exists'});
        }

        distributor = new Distributor({
        name,
        location
        });

        await distributor.save();
        const payload = {
            distributor:{
                id: distributor.id
            }
        }
        jwt.sign(payload, process.env.jwtSecret, {
            expiresIn: 3600
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
    }    
    catch(err){
        res.status(500).json({ message: err})
    }   
    
});

module.exports = router;