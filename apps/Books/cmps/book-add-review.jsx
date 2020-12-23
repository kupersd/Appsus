import { bookService } from "../services/books-service.js";

export class AddReview extends React.Component {

    state = {
        reviewerName: '',
        rating: 0,
        dateRead: 0,
        reviewText: ''
    }

    componentDidMount() {
        let d = new Date;
        this.setState({ dateRead: d.toLocaleDateString() })
    }
    onInputChange = (ev) => {
        const { name, value } = ev.target;
        this.setState({ [name]: value });
    }
    
    onSaveReview = (ev) => {
        ev.preventDefault();
        const { id } = this.props.book;
        bookService.saveReview(id, this.state);
    }

    render() {
        return (
            <section className="book-review mrg-start">
                <h2 className="mrg-bottom">Review Book</h2>

                <form className="mrg-bottom" onSubmit={this.onSaveReview}>
                    <div className="top-line flex mrg-bottom mrg-start">
                        <input value={this.state.reviewerName}
                            placeholder="Books Reader" type="text" name="reviewerName"
                            onChange={this.onInputChange} />
                        <input value={this.state.rating} type="number" name="rating"
                            min="0" max="5"
                            onChange={this.onInputChange} />
                        <input value={this.state.dateRead} type="date" name="dateRead"
                            onChange={this.onInputChange} />
                    </div>

                    <textarea className="mrg-start mrg-bottom" value={this.state.reviewText}
                        rows="8" cols="55"
                        placeholder="Your review..." type="textarea" name="reviewText"
                        onChange={this.onInputChange} />
                    <button className="mrg-bottom mrg-start">Submit</button>
                </form>
            </section>
        )
    }
}