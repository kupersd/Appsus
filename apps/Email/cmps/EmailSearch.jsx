export class EmailSearch extends React.Component {

    state = {
        filterBy: {
            mailText: '',
        }
    }

    handleChange = (ev) => {
        const callback = () => {
            this.props.setFilter('mailText', this.state.filterBy.mailText);
        };

        const filterBy = { ...this.state.filterBy }
        filterBy[ev.target.name] = ev.target.value;
        this.setState({ filterBy: { mailText: ev.target.value } }, callback);
    }

    render() {
        return <section className="email-search shadow flex space-between">
            <button onClick={this.props.toggleMenu} className="hamburger">=</button>
            <input type="text" name="mailText"
                value={this.state.filterBy.mailText}
                placeholder="Search mail..."
                onChange={this.handleChange} />
        </section>
    }
}