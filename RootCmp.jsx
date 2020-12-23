import { BooksApp } from './apps/Books/BooksApp.jsx';
import { KeepApp } from './apps/Keep/KeepApp.jsx';
import { EmailApp } from './apps/Email/EmailApp.jsx';
import { AppHeader } from './cmps/AppHeader.jsx';
import { About } from './pages/About.jsx';
import { Home } from './pages/Home.jsx';
import { Survey } from './pages/Survey.jsx';
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export class RootCmp extends React.Component {

    render() {
        return (
            <Router>
                <section className="app">
                    <AppHeader />
                    <Switch>
                        <Route path="/books" component={BooksApp} />
                        <Route path="/keep" component={KeepApp} />
                        <Route path="/email" component={EmailApp} />
                        <Route path="/about" component={About} />
                        {/* <Route path="/survey" component={Survey} /> */}
                        <Route path="/" component={Home} />
                    </Switch>
                    <footer className="animate__animated animate__jello">coffeerights 2020</footer>
                </section>
            </Router>
        );
    }
}
