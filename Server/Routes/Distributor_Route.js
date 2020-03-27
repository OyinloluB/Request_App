const express = require('express');
const router =  express.Router();

router.get('/', (req, res) => {
    Distributor.find()
    .then(Distributor => res.json())
    .catch(err => res.status(400).json('Error' + err))
});

router.get('/:_id', (req, res) =>{
    Distributor.findById(req.params.id)
    .then(Distributor => res.json())
    .catch(err => res.status(400).json('Error' + err))
});

router.post('/add', async(req, res) => {
    let errors = []
    if(!req.body.name){
        errors.push({text: 'Please enter a name'});
    }
    if(!req.body.location){
        errors.push({text: 'Please enter your location'});
    }
    if(errors.length > 0){
        res.render('/add', {
            errors: errors,
            name: req.body.name,
            location: req.body.location 
        })
    }
    else{
        const distributor = new Distributor({
            name: req.body.name,
            location: req.body.location
        });
        try{
            const savedDistributor = await distributor.save();
            res.json(savedDistributor);
        }
        catch(err){
            res.status(400).json({ message: err})
        }
    }
    
})

module.exports = router;