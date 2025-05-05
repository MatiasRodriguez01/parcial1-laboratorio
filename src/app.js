const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')

const { config } = require('dotenv')
config()

const app = express();


const port = 3000;
app.use((port) => {
    console.log("Corriendo el programa: ", port)
})