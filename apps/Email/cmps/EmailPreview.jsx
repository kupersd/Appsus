const { Link } = ReactRouterDOM;

export function EmailPreview({ email }) {
    return (
        <article className="email-preview">
            <Link>
                {/* NOT WORKING!??? */}
            </Link>
            <h4 className="inline">{email.subject.substr(0, 40)}</h4>
            <p className="inline">{email.body.substr(0, 150)}</p>

        </article>
    )
}