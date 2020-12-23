import { AppHeader } from './cmps/app-header.jsx';
import { BookDetails } from './cmps/book-details.jsx';
import { About } from './pages/about.jsx';
import { BooksList } from './pages/BooksList.jsx'
import { Home } from './pages/home.jsx';
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;


// Simple React Component
export class BooksApp extends React.Component {

    render() {
        return (
            <Router>
                <section className="app">
                    <Switch>
                        <Route path="/books/book/:bookId" component={BookDetails} />
                        <Route path="/books/about" component={About} />
                        <Route path="/books" component={BooksList} />
                    </Switch>
                </section>
            </Router>
        )
    }
}


