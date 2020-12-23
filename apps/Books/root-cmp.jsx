import { AppHeader } from './cmps/app-header.jsx';
import { BookDetails } from './cmps/book-details.jsx';
import { About } from './pages/about.jsx';
import { BookApp } from './pages/book-app.jsx'
import { Home } from './pages/home.jsx';
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;


// Simple React Component
export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <Switch>
                    <Route path="/book/:bookId" component={BookDetails} />
                    <Route path="/books" component={BookApp} />
                    <Route path="/about" component={About} />
                    <Route path="/" component={Home} />
                </Switch>
            </section>
        </Router>
    )
}


