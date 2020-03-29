const express = require('express');
const router =  express.Router();
const jwt = require('jsonwebtoken');
require('dotenv/config');
const auth = require('../Middleware/auth');
const {check, validationResult} = require('express-validator');

const Merchandiser = require('../Models/Merchandiser_Model')




router.route('/')
    .get(async (req, res) => {

        // @route   Get api/auth
        // @desc    Get logged in merchandiser
        // @access  Private
        try{
            const merchandiser = await Merchandiser.findById(req.merchandiser.id);
            res.json(merchandiser)
        }
        catch(err){
            res.status(500).send('Server Error');
        }
    })

    .post( [
        check('name', 'Please enter a name').exists(),
        check('location', 'Location is required').exists(),
        check('code', 'Your unique code is required').exists()
    ], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()});
        }
        const {name, location, code} = req.body;
        try{
            let merchandiser = await Merchandiser.findOne({name, location, code });

            if(!merchandiser) {
                res.status(400),json({msg: 'Invalid Credentials'});
            }
            const payload = {
                merchandiser:{
                    id: merchandiser.id
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
            res.status(500).send('Server Error');
        }
    });

module.exports = router;
