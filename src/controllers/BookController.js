const Book = require('../modules/bookModule')

const getBookId = async (res, req, next) => {
    let book;
    const { id } = req.params;

    try {
        book = await Book.findById(id);
        if (!book) {
            res.status(400).json({
                message: 'Error no se encontrol el libro: '
            })
        }
    } catch (err) {
        res.status(400).json({
            message: `Error en getBookId: , ${err.message}`
        })
    }
    
    res.book = book
    next();
}

const getBook = async (res, req) => {
    const book = res.book;
    res.json(book)
}

const getAllBooks = async (res, req) => {
    try {

        const books = await Book.find();
        if (!books) {
            res.status(400).json({
                message: `Error no se encontraron los libros`
            })
        }
        res.json(books)

    } catch (err) {
        res.status(400).json({
            message: `Error en getAllBooks: , ${err.message}`
        })
    }
}

const createBook = async (res, req) => {
    const { titulo, resumen, genero, publicacion, disponible } = req.body
    if (!titulo || !resumen || !genero || !publicacion || !disponible ) {
        res.status(400).json({
            message: `Al menos uno de estos cambios debe ser requerido: Titulo, Resumen, Genero, Publicacion, Disponible`
        })
    }

    try {
        const newBook = new Book(
            { 
                titulo,
                resumen, 
                genero, 
                publicacion, 
                disponible 
            }
        )

        const bookSaved = await newBook.save()
        res.status(201).json(bookSaved)

    } catch (err) {
        res.status(400).json({
            message: `Error en createBook: , ${err.message}`
        })
    }
}

const updateBook = async (res, req) => {
    
    const book = res.book;
    try {
        book.titulo = req.body.titulo || book.titulo
        book.resumen = req.body.resumen || book.resumen
        book.genero = req.body.genero || book.genero
        book.publicacion = req.body.publicacion || book.publicacion
        book.disponible = req.body.disponible || book.disponible

        const bookUpdate = await book.save()
        res.json(bookUpdate);

    } catch (err) {
        res.status(400).json({
            message: `Error en updateBook: , ${err.message}`
        })
    }
}

const deleteBook = async (res, req) => {
    const book = res.book;

    try {

        await book.deleteOne({
            _id: book._id
        })
        res.status(200).json({
            message: `El libro ${book.titulo} fue eliminado`
        })

    } catch (err) {
        res.status(400).json({
            message: `Error en deleteBook: , ${err.message}`
        })
    }
}

module.exports = {
    getBookId,
    getBook,
    getAllBooks,
    createBook,
    updateBook,
    deleteBook
}