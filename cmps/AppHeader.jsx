import { eventBusService } from "../services/eventBusService.js";

const { NavLink, withRouter } = ReactRouterDOM;



class _AppHeader extends React.Component {

    state = {
        msg : ''
    }

    componentDidMount() {
        this.unsubscribe = eventBusService.on('showMsg', (msg) => {
            this.setState({ msg });
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    goToAbout = () => {
        this.props.history.push('/about');
    }        

    render() {
        const {msg} = this.state; 
        return <header className="app-header">
            <nav className="flex space-between align-center main-layout">
                <ul className="">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/books">Books</NavLink></li>
                    <li><NavLink to="/email">Mail</NavLink></li>
                    <li><NavLink to="/keep">Keep</NavLink></li>
                </ul>
                <div className="">
                    <h1>Appsus. by Ori &amp;&amp; Dudi</h1>
                </div>
            </nav>
            {/* {msg && <div className="user-msg">
                {msg}
            </div>} */}
        </header>
    }
}

//HOC - higher order component
export const AppHeader = withRouter(_AppHeader);