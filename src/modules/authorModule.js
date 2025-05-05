const mongoose = require("mongoose")

const Author = new mongoose.Schema(
    {
        Nombre: String,
        Bio: String,
        FechaNacimiento: Date,
        Nacionalidad: String,
        Libros: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            }
        ]
    }
)

module.exports = mongoose.model("Author", Author)