// Demo for DynamicComponents

var survey = {
    title: 'Robots Shopping',
    cmps: [
        {
            type: 'textBox',
            info: {
                label: 'Your name:'
            }
        },
        {
            type: 'selectBox',
            info: {
                label: 'How was it:',
                opts: ['Great', 'Fine', 'Crap']
            }
        },
        {
            type: 'linearScale',
            info: {
                label: 'Quality:',
                max: 5
            }
        },
    ]
}

export class Survey extends React.Component {

    state = {
        survey,
        answers: []
    };

    componentDidMount() {
        this.setState({ answers: new Array(this.state.survey.cmps.length) })
    }

    onAns = (idx, ans) => {
        const copy = [...this.state.answers]
        copy[idx] = ans;
        this.setState({ answers: copy })
    }

    render() {
        const { survey, answers } = this.state;
        return (
            <section className="survey">
                <h1>Survey - {survey.title}</h1>

                <form>
                   {survey.cmps.map((cmp, idx) => <div key={idx}>
                        <DynamicSurveyCmp currCmp={cmp.type} info={cmp.info} onAns={(ans) => {
                            this.onAns(idx, ans);
                        }} />
                    </div>)}

                    <button onClick={(ev)=>{
                        ev.preventDefault();
                        console.log('Saving:', answers);
                    }}> Send</button>
                </form>

                <hr />
                <pre>{JSON.stringify(answers, null, 2)}</pre>
            </section>
        );
    }
}

function DynamicSurveyCmp({ currCmp, info, onAns }) {
    switch (currCmp) {
        case 'textBox':
            return <InputBox info={info} onAns={onAns} />
        case 'selectBox':
            return <SelectBox info={info} onAns={onAns} />
        case 'linearScale':
            return <LinearScale info={info} onAns={onAns} />
    }
    return <p>UNKNWON</p>
}


function LinearScale({ info, onAns }) {
    return <label>
        {info.label}
        <input type="range" max={info.max} onChange={(ev) => {
            onAns(+ev.target.value)
        }} />
    </label>
}
function SelectBox({ info, onAns }) {
    return <label>
        {info.label}
        <select onChange={(ev) => {
            onAns(ev.target.value)
        }}>
            {info.opts.map(opt => <option key={opt}>{opt}</option>)}
        </select>
    </label>
}
function InputBox({ info, onAns }) {
    return <label>
        {info.label}
        <input placeholder={info.label} onChange={(ev) => {
            onAns(ev.target.value)
        }} />
    </label>
}
