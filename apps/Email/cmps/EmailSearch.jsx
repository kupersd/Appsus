export class EmailSearch extends React.Component {

    state = {
        filterBy: {
            mailText: '',
            // mailBox: 'all'
        }
    }

    handleChange = (ev) => {
        const callback = () => {
            this.props.setFilter(this.state.filterBy.mailText);
        };

        const filterBy = { ...this.state.filterBy }
        filterBy[ev.target.name] = ev.target.value;
        this.setState({ filterBy: {mailText: ev.target.value} }, callback);
    }

    render() {
        return <section className="email-search">
            <input type="text" name="mailText"
                value={this.state.filterBy.mailText}
                placeholder="Search mail..."
                onChange={this.handleChange}/>
        </section>
    }
}