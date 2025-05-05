const express = require('express')

const router = express.Router();

const {
    getBookId,
    getBook,
    getAllBooks,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/BookController');

router.get("/", getAllBooks);

router.get("/:id", getBookId, getBook);

router.post("/", getBookId, createBook);

router.put("/:id", getBookId, updateBook);

router.delete("/:id", getBookId, deleteBook);

module.exports = router