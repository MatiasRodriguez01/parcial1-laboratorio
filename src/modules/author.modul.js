const mongoose = require("mongoose")

const Author = new mongoose.Schema(
    {
        nombre: String,
        bio: String,
        fechaNacimiento: Date,
        nacionalidad: String,
        libros: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            }
        ]
    }
)

module.exports = mongoose.model("Author", Author)