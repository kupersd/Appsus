import { loadBooks } from "./mango-db.js"

export const bookService = {
    query,
    getById,
    saveReview,
    deleteReview,
    deleteBook
}

// Globals
let gBooks = loadBooks();
window.books = gBooks;

// CREATE


// READ
function query() {
    return Promise.resolve(gBooks);
}

function getById(bookId) {
    const book = gBooks.find(book => book.id === bookId);
    return Promise.resolve(book);
}

// UPDATE
function saveReview(bookId, props) {
    console.log(props)
    getById(bookId).then(book => {
        if (!book.reviews) {
            book.reviews = [];
        }
        book.reviews.push(props);
        console.log(book);
        return book;
    }).then(bookToUpdate => {
        const booksCopy = [...gBooks];
        const bookIndex = books.findIndex(book => book.id === bookId);
        booksCopy[bookIndex] = bookToUpdate;
        gBooks = booksCopy;
    });
}

function deleteReview(bookId, reviewIdx) {
    
}

// DELETE
function deleteBook(bookId) {
    gBooks = gBooks.filter(book => book.id !== bookId);
}

