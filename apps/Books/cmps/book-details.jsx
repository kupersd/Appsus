import { bookService } from "../services/books-service.js";
import { AddReview } from "./book-add-review.jsx";
import { ListReviews } from "./book-list-reviews.jsx";
import { LongTxt } from "./longtext.jsx";

export class BookDetails extends React.Component {

    state = {
        book: null,
        isLongTxtShown: false,
        bookLength: null,
        releaseDateNotes: null,
        isOnSale: false,
    }

    componentDidMount() {
        const { bookId } = this.props.match.params;
        bookService.getById(bookId)
            .then(book => {
                this.setState({ book }, () => {
                    this.getBookReadingWeight();
                    this.getYearSpecialText();
                })
            });
    }

    onReadMore = () => {
        this.setState({
            isLongTxtShown: true
        })
    }

    getBookReadingWeight = () => {
        const { book } = this.state;
        const bookLength = (book.pageCount > 500) ?
            'Long' : (book.pageCount > 200) ? 'Medium' : 'Light';
        this.setState({ bookLength });
    }

    getYearSpecialText = () => {
        const { book } = this.state;
        const d = new Date;
        const yearsApart = d.getFullYear() - book.publishedDate;

        const releaseDateNotes = (yearsApart > 10) ?
            'Veteran Book' : (yearsApart < 2) ? 'New!' : '';
        this.setState({ releaseDateNotes })
    }

    onDeleteReview = (reviewIdx) => {
        const { bookId } = this.props.match.params;
        console.log('book-details Comp received delete with book ID:', bookId, 'review idx', reviewIdx)
        bookService.deleteReview(bookId, reviewIdx);
    }

    render() {
        if (!this.state.book) return <div>Loading book...</div>
        const { book } = this.state;
        const { isOnSale } = book.listPrice;

        return (
            <section>
                <section className="book-details">
                <h2>{book && book.title}</h2>
                <h4>{book && book.authors[0]}</h4>
                <div className="book-tags">
                    <span className="mrg-start">{this.state.bookLength} reading</span>
                    {this.state.releaseDateNotes && <span className="mrg-start">{this.state.releaseDateNotes}</span>}
                </div>
                <img src={book.thumbnail} />
                <LongTxt text={book.description} isLongTxtShown={this.state.isLongTxtShown} readMore={this.onReadMore} />
                {isOnSale && <span className="sale">On Sale!</span>}
                <div className="book-tags-inv flex">
                    <BookCategories book={book} />
                </div>
                </section>
                <AddReview book={book} />
                <ListReviews book={book} onDelete={this.onDeleteReview}/>
            </section>
        )
    }
}

function BookCategories({ book }) {
    if (!book.categories) return <span>ERRRRR</span>
    return book.categories.map((ctg, index) => {
        return <span className="mrg-start" key={index}>{ctg}</span>
    })
}
