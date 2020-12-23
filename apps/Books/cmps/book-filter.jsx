export class BookFilter extends React.Component {

    state = {
        title: '',
        price: 0
    }

    handleChange = (ev) => {
        const value = ev.target.type === 'range' ? +ev.target.value
            : ev.target.value;
        
        const filterCopy = { ...this.state };
        filterCopy[ev.target.name] = value;

        this.setState({ ...filterCopy }, () => {
            this.props.setFilter(this.state);
        })
    }

    render() {
        return <section className="book-filter">
            <label>Title:</label>
            <input type="text" name="title"
                value={this.state.title}
                placeholder="filter"
                onChange={this.handleChange} />
            <label>Min. Price:</label>
            <input type="range" name="price"
                min="0" max="200"
                value={this.state.price}
                onChange={this.handleChange} />
            <label>{this.state.price}</label>
            </section>
    }
}