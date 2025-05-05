const Author = require('../modules/author.modul')
const Book = require('../modules/book.modul')

const getAuthorId = async (req, res, next) => {
    let author;
    const { id } = req.params;

    try {
        author = await Author.findById(id).populate("libros")
        if (!author) {
            res.status(400).json({
                message: `Error el author no se encuentro!!`
            })
        }

    } catch (err) {
        res.status(400).json({
            message: `Error en getAuthorId: ${err.message}`
        })
    }

    res.author = author;
    next();
}

const getAuthor = async (req, res) => {
    const author = res.author;
    res.json(author)
}

const getAllAuthor = async (req, res) => {
    try {

        const authors = await Author.find();
        if (!authors) {
            res.status(400).json({
                message: `Error no se encuentran los autores`
            })
        }
        res.json(authors)

    } catch (err) {
        res.status(400).json({
            message: `Error en getAllAuthor: ${err.message}`
        })
    }
}

const createAuthor = async (req, res) => {
    const { nombre, bio, fechaNacimiento, nacionalidad, libros } = req.body
    if (!nombre || !bio || !fechaNacimiento || !nacionalidad) {
        res.status(400), json({
            message: 'Al menos uno de estos campos tiene que ser requerido: nombre, bio, fechaNacimiento, nacionalidad'
        })
    }

    try {
        const newAuthor = new Author(
            {
                nombre,
                bio,
                fechaNacimiento,
                nacionalidad,
                libros
            }
        )

        const authorSaved = await newAuthor.save();
        res.status(201).json(authorSaved)

    } catch (err) {
        res.status(400).json({
            message: `Error en createAuthor: ${err.message}`
        })
    }
}

const updateAuthor = async (req, res) => {
    const author = res.author;
    try {
        author.nombre = req.body.nombre || res.nombre
        author.bio = req.body.bio || res.bio
        author.fechaNacimiento = req.body.fechaNacimiento || res.fechaNacimiento
        author.nacionalidad = req.body.nacionalidad || res.nacionalidad
        author.libros = req.body.libros || res.libros

        const authorUpdate = await author.save()
        res.json(authorUpdate);
    } catch (err) {
        res.status(400).json({
            message: `Error en updateAuthor: ${err.message}`
        })
    }
}

const deleteAuthor = async (req, res) => {
    const author = res.author;

    try {

        await author.deleteOne({
            _id: author._id
        })
        res.status(200).json({
            message: `El libro ${author.nombre} fue eliminado`
        })

    } catch (err) {
        res.status(400).json({
            message: `Error en deleteAuthor: , ${err.message}`
        })
    }
}

const createBookInAuthor = async (req, res) => {

    const { idBook } = req.params;

    try {
        const { titulo, resumen, genero, publicacion, disponible } = req.body

        const newBook = await Book.findById(idBook);

        const author = res.author;
        author.libros.push(newBook._id)
        
        await author.save();

        res.json(newBook)
    } catch (err) {
        res.status(400).json({
            message: `Error en createBookInAuthor: , ${err.message}`
        })
    }
}


module.exports = {
    getAuthorId,
    getAuthor,
    getAllAuthor,
    createAuthor,
    deleteAuthor,
    createBookInAuthor

}