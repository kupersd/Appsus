import { bookService } from '../services/books-service.js'
import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { BookDetails } from '../cmps/book-details.jsx'


export class BooksList extends React.Component {

    state = {
        books: [],
        filterBy: {
            price: null,
            title: ''
        }
    }

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        bookService.query()
        .then(books => this.setState({ books }));
    }

    getBookToList = () => {
        const { filterBy } = this.state;
        const { books } = this.state;

        return books.filter(book => {
            return (
                book.title.toLowerCase().includes(filterBy.title.toLowerCase()) && 
                book.listPrice.amount > filterBy.price
            );
        })
    }

    onDeleteBook = (bookId) => {
        console.log('main app received book to delete');
        // bookService.deleteBook(bookId);
        // this.loadBooks();
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy });
    }

    render() {

        
        return (
            <section className="book-app">
                <BookFilter setFilter={this.onSetFilter} />
                <section className="book-list flex">
                    <BookList books={this.getBookToList()} onDelete={this.onDeleteBook}/>
                </section>
            </section>
        )
    }
}