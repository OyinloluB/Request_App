const express = require('express');
const router =  express.Router();

//Fetch all merchandiser details
router.get('/', (req, res) => {
    merchandiser.find()
    .then(merchandiser => res.json())
    .catch(err => res.status(400).json('Error'+ err))
});

//Fetch a single merchandiser detail

router.get('/:_id', (req, res) => {
    merchandiser.findById(req.params.id)
    .then(merchandiser => res.json())
    .catch(err => res.status(400).json('Error' + err))
})

//Create new merchandiser
 router.post('/add', async(req, res) => {

    let errors = [];
    if(!req.body.name){
        errors.push({text: 'Please add a name'});
    }
    if(!req.body.location){
        errors.push({text: 'Please add location'});
    }
    if(errors.length > 0){
        res.render('/add', {
            errors: errors,
            name: req.body.name,
            location: req.body.location
        })
    }
    else{

        const merchandiser = new Merchandiser({
            name: req.body.name,
            location: req.body.location,
            code: req.body.code 
        })
        try{
            const savedMerchandiser = await merchandiser.save();
            res.json(savedMerchandiser); 
        }
        catch(err){
            res.status(400).json({message: err})
        };
    }
    
    
 });

 router.update('/')

module.exports = router;