const express = require('express');
const mongoose = require('mongoose');
const app = express(); 
const path = require('path');

require('dotenv/config');


const distributorRoute = require('./Server/Routes/Distributor_Route');
const merchandiserRoute = require('./Server/Routes/Merchandiser_Route')

app.use('/Distributor', distributorRoute);
app.use('/merchandiser', merchandiserRoute);


app.use(express.json({extended: false}));

const port = process.env.PORT || 5000 

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true  
});


const db = mongoose.connections;

db.on('error', console.error.bind(console, 'connection:' ));
db.once('open', () => {
    console.log('Database Connected Successfully')
})

// routes(app);

