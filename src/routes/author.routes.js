const express = require('express');

const router = express();

const {
    getAuthorId,
    getAuthor,
    getAllAuthor,
    createAuthor,
    deleteAuthor

} = require('../controllers/authorController')

/*
PUT /authors/:id/addBook/:bookId: Agregar un libro a la lista del autor.
otra opción: /authors/addBook?id=:id&bookId=:bookId:
*/

router.get('/:id', getAuthorId, getAuthor)

router.get('/', getAllAuthor)

router.post('/', createAuthor)

router.put('/:id', getAuthorId, createAuthor)

router.delete('/:id', getAuthorId, deleteAuthor)