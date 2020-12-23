const { NavLink } = ReactRouterDOM;

export function AppHeader() {
    return (
        <nav className="top-nav flex space-between">
            <ul className="flex">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/books">Books</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
            </ul>
            <span>Ms. BOOKs.</span>
        </nav>
    )
}