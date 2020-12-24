export class KeepFilter extends React.Component {

    state = {
        filterBy: {
            freeText: '',
            type: ''
        }
    };

    handleChange = (ev) => {
        const callback = () => {
            this.props.setFilter(this.state.filterBy);
        };
        const filterBy = { ...this.state.filterBy }
        filterBy[ev.target.name] = ev.target.value;
        this.setState({ filterBy }, callback);
    };

    render() {
        return <section className="keep-filter">
            <input type="text" name="freeText"
                value={this.state.filterBy.freeText}
                placeholder="Search"
                autoComplete="off"
                onChange={this.handleChange} />
            <select name="type" value={this.state.filterBy.type}
                onChange={this.handleChange}>
                <option value="">All</option>
                <option value="noteText">Text</option>
                <option value="noteImg">Image</option>
                <option value="noteVideo">Video</option>
                <option value="noteTodos">Todos</option>
            </select>
        </section>;
    }

}