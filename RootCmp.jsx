import { BooksApp } from './apps/Books/BooksApp.jsx';
import { NoteApp } from './apps/Keep/NoteApp.jsx';
import { EmailApp } from './apps/Email/EmailApp.jsx';
import { AppHeader } from './cmps/AppHeader.jsx';
import { AppFooter } from './cmps/AppFooter.jsx';
import { About } from './pages/About.jsx';
import { Home } from './pages/Home.jsx';
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export class RootCmp extends React.Component {

    render() {
        return (
            <Router>
                <section className="page-container">

                    <AppHeader />
                    <section className="app main-layout">
                        <Switch>
                            <Route path="/books" component={BooksApp} />
                            <Route path="/keep" component={NoteApp} />
                            <Route path="/email" component={EmailApp} />
                            <Route path="/about" component={About} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </section>
                    <AppFooter />
                </section>
            </Router>
        );
    }
}
