import { bookService } from "../services/books-service.js";

export function ListReviews(props) {
    console.log(props);
    if (!props.book.reviews || props.book.reviews.length === 0) return <div>No reviews yet. Did you read it?</div>
    const { reviews } = props.book;
    return (
        <section className="reviews-list">
            <h1>Reviews:</h1>
            <ul className="clean-list flex">
                {reviews.map((review, index) => {
                    return <ReviewItem review={review} key={index}
                    onDelete={props.onDelete} className="review-list" />
                })}
            </ul>
        </section>
    )
}

function ReviewItem({ review, onDelete }) {
    return (
        <li className="review-item mrg-start mrg-bottom">
            <h4>{'"' + review.reviewText.substr(0, 25) + '..."'}</h4>
            <span className="mrg-start">{review.reviewerName}</span> 
            <span className="mrg-start mrg-bottom">{review.rating + '/5'}</span>
            <button onClick={() => { onDelete(0) }} className="btn-del">X</button>
            {/* TODO: Get real index for review, and implement delete review */}
        </li>
    )
}