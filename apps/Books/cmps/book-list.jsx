import { BookPreview } from "./book-preview.jsx"

export function BookList({ books }) {
    return (
        books.map(book => {
            return <BookPreview book={book} key={book.id}/>
        })
    )
}