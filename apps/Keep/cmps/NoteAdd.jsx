import { keepService } from "../services/keepService.js";

export class NoteAdd extends React.Component {

    state = {
        note: { type: '', info: null }
    };

    componentDidMount() {
    }


    onSaveNote = (ev) => {//on submit
        ev.preventDefault();
        keepService.save(this.state.note)
            .then(savedNote => {
                console.log('Saves succesfully', savedNote);
                // TODO: render the list of notes
            })

    };

    onInputChange = (ev) => {//on input change
        const value = (ev.target.type === 'number')? +ev.target.value  : ev.target.value;
        const note = { ...this.state.note };
        note[ev.target.name] = value;  
        this.setState({
            note
        });
    };

    render() {
        return (
            <form onSubmit={this.onSaveNote}>

                <input value={this.state.note.info} ref={this.refInput}
                    placeholder="Name" type="text" name="name"
                    onChange={this.onInputChange} />

                <input value={this.state.pet.power} required
                    placeholder="Power" type="number" name="power"
                    onChange={this.onInputChange} />

                <button type="submit">{(this.state.pet.id)? 'Update' : 'Add'}</button>
                <button type="button" onClick={this.onAnimate}>Animate</button>
            </form>
        );
    }
}
