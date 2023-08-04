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
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())