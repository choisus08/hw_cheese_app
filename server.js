// IMPORT DEPENDENCIES
require ('dotenv').config();
const {PORT = 5000, DATABASE_URL} = process.env;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');


// DATABASE CONNECTION
mongoose.connect(DATABASE_URL)
mongoose.connection
    .on('open', () => console.log('You are now connected to mongoose'))
    .on('close', () => console.log('You are disconnected from mongoose'))
    .on('error', (error) => console.log(error))


// MODELS
const cheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String
});

const Cheese = mongoose.model("Cheese", cheeseSchema);


// MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// ROUTES

//INDEX -GET
app.get('/cheese', async (req, res) => {
    try {
        const cheese = await Cheese.find({});
        res.json(cheese);
    } catch (error) {
        res.status(400).json({error});
    }
});

// CREATE -POST
app.post('/cheese', async (req, res) => {
    try {
        const cheese = await Cheese.create(req.body);
        res.json(cheese);
    } catch (error) {
        res.status(400).json({error});
    }
});

// SHOW -GET 
app.get('/cheese/:id', async (req, res) => {
    try {  
        const cheese = await Cheese.findById(req.params.id);
        res.json(cheese);
    } catch (error) {
        res.status(400).json({error});
    }
});

// UPDATE -PUT 
app.put('/cheese/:id', async (req, res) => {
    try {
        const cheese = await Cheese.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(cheese)
    } catch (error) {
        res.json({error})
    }
})

// test route
app.get('/', (req, res) => {
    res.json({hello: 'world'})
});

// LISTENER
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));