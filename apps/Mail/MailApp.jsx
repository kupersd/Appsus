const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export class MailApp extends React.Component {

    render() {
        return (
            <Router>
                <section className="app">
                    {/* <Switch>
                        <Route path="/pet/edit/:petId?" component={PetEdit} />
                        <Route path="/pet/:petId" component={PetDetails} />
                        <Route path="/pet" component={PetApp} />
                        <Route path="/about" component={About} />
                        <Route path="/survey" component={Survey} />
                        <Route path="/" component={Home} />
                    </Switch> */}
                    <h1>Mail App</h1>
                    {/* <footer className="animate__animated animate__jello">coffeerights 2020</footer> */}
                </section>
            </Router>
        );
    }
}
