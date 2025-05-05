const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const { config } = require('dotenv')
config()

const { PORT, URL, DB_NAME } = process.env;

const bookRoutes = require('./routes/book.routes')
const authorRoutes = require('./routes/author.routes')

const app = express();
app.use(bodyParser.json())

mongoose.connect(URL, {
    dbName: DB_NAME,
  })
    .then(() => console.log("✅ Conectado a Mongo Atlas"))
    .catch((err) => console.error("❌ Error conectando a MongoDB: ", err));
const db = mongoose.connection;


app.use("/libros", bookRoutes)
app.use("/autors", authorRoutes)

const port = PORT || 3000
app.listen(port, () => {
    console.log(`Corriendo el programa: ${port}`)
})
