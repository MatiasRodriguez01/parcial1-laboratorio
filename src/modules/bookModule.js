const mongoose = require("mongoose")

const Book = new mongoose.Schema(
    {
        Titulo: String,
        Resumen: String,
        Género: String,
        Publicacion: Date,
        Disponible: Boolean

    }
)

