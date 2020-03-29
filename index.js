const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const path = require('path');

require('dotenv/config');

// Initialize middleware
app.use(express.json({extended: false}));
app.use(cors())

const distributorRoute = require('./Server/Routes/Distributor_Route');
const merchandiserRoute = require('./Server/Routes/Merchandiser_Route');
const requestRoute = require('./Server/Routes/Request_Route');
const authOne = require('./Server/Routes/merchandiser_login');
const authTwo = require('./Server/Routes/distributor_login');

app.use('/Distributor', distributorRoute);
app.use('/Merchandiser', merchandiserRoute);
app.use('/Request', requestRoute);
app.use('/merchandiser_auth', authOne);
app.use('/distributor_auth', authTwo);




const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});

// mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true  
})
.then(res =>  console.log('Database Connected Successfully'))
.catch(err => console.log(err))

// routes(app);

 