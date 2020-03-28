const express = require('express');
const router =  express.Router();
const {check, validationResult} = require('express-validator');

const Distributor = require('../Models/Distributor_Model');

router.get('/', async (req, res) => {
    try{
        const distributors = await Distributor.find();
        res.json(distributors)
    }
    catch(err) {
        err => res.status(400).json('Error' + err)
    }
});

router.get('/:_id', async (req, res) =>{
    try{
        const distributor = await Distributor.findById(req.params.id);
        res.json(distributor)
    }
    catch(err ){
        err => res.status(400).json('Error' + err)
    }
});

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
            res.status(400).json({message: 'User already existd'});
        }

        distributor = new Distributor({
        name,
        location
        });

        await distributor.save();
        res.send('User saved');
    }    
    catch(err){
        res.status(500).json({ message: err})
    }   
    
});

module.exports = router;