export function EmailDetails({ email }) {
    if (!email) return <div>Loading mail...</div>
    return (
        <article className="email-details">
            <h2>{email.subject}</h2>
            <p>{email.body}</p>
            <button>(Delete email)</button>
        </article>
    )
    
}