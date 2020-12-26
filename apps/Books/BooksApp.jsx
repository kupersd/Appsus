import { BookDetails } from './cmps/BookDetails.jsx';
import { BooksList } from './pages/BookApp.jsx'
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export class BooksApp extends React.Component {

    render() {
        return (
            <section className="app">
                <Switch>
                    <Route path="/books/book/:bookId" component={BookDetails} />
                    <Route path="/books/about" component={About} />
                    <Route path="/books" component={BooksList} />
                </Switch>
            </section>
        )
    }
}


