const e = React.createElement;

class Gauge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0.0,
        }
    }
    static defaultProps = {
        name: 'default',
        color: 'Aquamarine',
        mode : 'equity',
        value : 50,
    };

    componentDidMount() {
        this.setState({
            name: this.props.name,
            color: this.props.color,
            mode: this.props.mode,
            value: this.props.value,
        });
        this.ChangeWidthTransition(this.props.value);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.ChangeWidthTransition(this.props.value);
        }
    }
    ChangeWidthTransition(input, duration = 500) {
        console.log(input)
        if(input < 5) input = 5;

        if(this.props.mode === 'none'){
            this.setState({
                width: input,
            });
        }
        if(this.props.mode === 'equity'){
            var frequency = duration / 1000;
            for (let i = 0; i < input*10; i++) {
                setTimeout(() => {
                    this.setState({
                        width:  i/10  + 0.1,
                    });
                }, i * frequency);
            }
        }
        if(this.props.mode === 'fare'){
            var frequency = duration/1000 * 100 / (input);
            for (let i = 0; i < input*10; i++) {
                setTimeout(() => {
                    this.setState({
                        width:  i/10  + 0.1,
                    });
                }, i * frequency);
            }
        }


    }

    render() {
        // const duration = this.state.value * 0.02;
        const duration = 2000;
        return e(
            'div', {
                className: 'gauge',
                style: {
                    marginTop: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: '15px',
                }
            },
            e('span', {
                style: {
                    fontStyle: 'inherit',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    color: 'inherit',
                    width: '20%',
                    textAlign: 'right',
                }
            }, this.state.name),
            e(
                'div', {
                    style: {
                        display: 'inline-block',
                        margin: '10px',
                        width: '65%',
                        height: '100%',
                        backgroundColor: '#555',
                        borderRadius: Number.MAX_SAFE_INTEGER + 'px',
                    }
                },
                e(
                    'div', {
                        style: {
                            display: 'inline-block',
                            position: 'inline-block',
                            width: this.state.width + '%',
                            //width: '0%',
                            height: '100%',
                            backgroundColor: this.state.color,
                            borderRadius: Number.MAX_SAFE_INTEGER + 'px',
                            // transition: 'width ' + duration + 'ms',
                        }
                    },
                )
            ),
            e('span', {
                style: {
                    fontStyle: 'inherit',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    color: 'inherit',
                }
            }, this.state.value + '%'),
        )
    }
}

/******************* Using Example *********************/

dataset = [{
        name: '심폐지구력',
        value: 100,
        color: 'red'
    },
    {
        name: '순발력',
        value: 80,
        color: 'orangered'
    },
    {
        name: '근지구력',
        value: 60,
        color: 'orange'
    },
    {
        name: '민첩성',
        value: 40,
        color: 'gold'
    },
    {
        name: '균형',
        value: 100,
        mode: 'equity',
        color: 'yellow'
    },
    {
        value: 80,
        color: 'pink',
        mode: 'equity',
    },
    {
        name: '근력',
        value: 60,
        mode: 'equity',
        color: 'violet'
    },
    {
        name: '체력',
        value: 40,
        mode: 'equity',
        color: 'purple'
    },
    {
        name: '체력',
        value: 20,
        mode: 'equity',
        color: 'indigo'
    }
]

window.onload = function () {

    const domContainer = document.querySelector('#container');

    function makeGauges(dataset) {
        var gauges = [];
        for (var i = 0; i < dataset.length; i++) {
            gauges.push(e(Gauge, dataset[i]));
        }
        ReactDOM.render(e('div', {}, gauges), domContainer);
    }

    makeGauges(dataset);
}