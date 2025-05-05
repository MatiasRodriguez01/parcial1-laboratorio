const mongoose = require("mongoose")

const Book = new mongoose.Schema(
    {
        titulo: String,
        resumen: String,
        genero: String,
        publicacion: Date,
        disponible: Boolean

    }
)

module.exports = mongoose.model("Book", Book)