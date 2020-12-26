import { eventBusService } from "../services/eventBusService.js";
import { themeService } from "../services/themeService.js";

const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {

    state = {
        msg: '',
        theme: 1,
        themeCount: 4
    }

    componentDidMount() {
        this.unsubscribe = eventBusService.on('showMsg', (msg) => {
            this.setState({ msg });
        });
    }

    changeTheme() {
        const nextThem = (this.state.theme >= this.state.themeCount - 1) ? 0 : this.state.theme + 1;
        themeService.setTheme(nextThem);
        this.setState({ theme: nextThem });
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
                <li><button onClick={() => this.changeTheme(0)}>🌈</button></li>
                </ul>
                <div className="">
                    <h1>Appsus. by Ori &amp;&amp; Dudi</h1>
                </div>
            </nav>

        </header>
    }
}

export const AppHeader = withRouter(_AppHeader);