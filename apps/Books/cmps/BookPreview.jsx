const { Link } = ReactRouterDOM;

export function BookPreview({ book }) {

    return (
        <Link to={`/books/book/${book.id}`}>
            <article className="book-item flex space-between shadow" key={book.id}>
                <h3>
                    {book.title}
                </h3>
                <img src={`${book.thumbnail}`} alt=""/>
                <button className="btn-del shadow" onClick={(ev) => {
                    ev.preventDefault()
                }}>X
                    </button>

                <span>
                    {Intl.NumberFormat('en-IN', { style: 'currency', currency: book.listPrice.currencyCode }).format(book.listPrice.amount)}
                </span>
            </article>
        </Link>
    )
}