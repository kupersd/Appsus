export function LongTxt({ text, isLongTxtShown, readMore }) {
    const maxChars = 100;
    if (isLongTxtShown) return <p>{ text }</p>;
    if (text.length <= maxChars) return <p>{text}</p>;
    const trimmedText = text.substr(0, 100) + '...'
    return <section>
        <p>{trimmedText}</p>
        <span className="read-more" onClick={readMore}>read more</span>
            </section>
}