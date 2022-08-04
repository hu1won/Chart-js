const e = React.createElement;

class Circle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // color: '#aaa',
        }
    }
    componentDidMount() {
        this.setState({
            color: this.props.color,
        })
    }
    render() {
        return e('div', {
            className: 'circle',
            style: {
                display: 'inline-block',
                height: '100%',
                // positon: 'relative',
                borderRadius: Number.MAX_SAFE_INTEGER + 'px',
                // border: '1px solid yellow',
                backgroundColor: this.state.color,
                margin: '0 5px',
            }
        },
            e('svg', {
                viewBox: '0 0 100 50',
                style: {
                    height: '100%',
                }
            }),
        )
    }
}

class FillCircle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: '30px',
            circles: [],
            last_test: '',
            img_src: '',
            sentence: ''
        }
    }
    static defaultProps = {
        name : '근력',
        novation: 'good',
        last_test: '02/22/2022',
        number: 2,
        max: 3,
    };

    componentDidMount() {
        setTimeout(() => {

        this.makeCircles(() => {
            this.setState({
                name: this.props.name,
                number: this.props.number,
                max: this.props.max,
                value: this.props.value,
                // color: this.props.color,
                color : this.getColorFromYellowToBlue(this.props.value/this.props.max),
                last_test: this.props.last_test,
            })
        });
        }, 200);

        if (this.props.novation) {
            switch (this.props.novation) {
                case 'good':
                    this.setState({
                        img_src: './icons/good.png',
                        sentence: '테스트가 최신입니다.'
                    })
                    break;
                case 'warning':
                    this.setState({
                        img_src: './icons/yellowwarning.png',
                        sentence: '테스트가 최신이 아닙니다.'
                    })
                    break;
                case 'expire':
                    this.setState({
                        img_src: './icons/redwarning.png',
                        sentence: '테스트가 곧 만료됩니다.'
                    })
                    break;
                default:
                    this.setState({
                        img_src: './icons/good.png',
                        sentence: 'Neutral'
                    })
                    break;
            }
        }
    }

    makeCircles(_callback) {
        for (let i = 0; i < this.props.max; i++) {
            var color;
            if(i < this.props.number){
                color = this.getColorFromYellowToBlue(this.props.number, this.props.max);
            }
            else{
                color = '#555';
            }
            this.state.circles.push(e(Circle, { color: color }));
        }
        _callback();
    }

    getColorFromYellowToBlue(number, max){
        var range = 0;
        if(max == 1){
            return '#4169E1';
        }
        else{
            range = (number-1)/(max - 1);
        }
        let r = 96 * range * range - 310 * range + 255;
        let g = -440 * range * range + 294 * range + 215;
        let b = 450 * range * range - 225 * range;
        if (r < 0) r = 0;
        if (g < 0) g = 0;
        if (b < 0) b = 0;
        if (r > 255) r = 255;
        if (g > 255) g = 255;
        if (b > 255) b = 255;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    ComponentDidUpdate(prevProps) {
    }

    render() {
        return e(
            'div',
            {
                className: 'fillCircle',
                style: {
                    width: '100%',
                    height: this.state.height,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#fff',
                    marginTop: '5px',
                    display: 'flex',
                    alignItems: 'center',
                }
            },
            e('span', {
                style: {
                    width : '20%',
                    fontStyle: 'inherit',
                    fontSize: '14px',
                    fontWeight: 'inherit',
                    textAlign: 'right',
                    color: 'inherit',
                }
            }, this.state.name ),
            e('div', {
                className: 'fillCircle-circles',
                style: {
                    // width: '50%',
                    marginLeft: '10px',
                    display : 'inline-block',
                    height: '100%',
                }
            },
                this.state.circles),

            e('img', {
                src: this.state.img_src,
                style: {
                    height: '100%',
                    margin: '0 10px',
                }
            }),
            e('span', {
                style: {
                    fontStyle: 'inherit',
                    fontSize: '10px',
                    fontWeight: 'inherit',
                    color: 'inherit',
                }
            }, this.state.sentence, 
            e('br'), 
            this.state.last_test),
        )

    }
}


dataset = [{
    name: '심폐지구력',
    number: 1,
    novation: 'good',
},
{
    name: '순발력',
    number: 1,
    novation: 'warning',
},
{
    name: '근지구력',
    number: 1,
    novation: 'expire',
},
{
    name: '민첩성',
    number: 2,
    novation: 'good',
},
{
    name: '균형',
    number: 3,
    novation: 'good',
},
]

window.onload = function () {

    const domContainer = document.querySelector('#container');

    function makeFiller(dataset) {
        var gauges = [];
        for (var i = 0; i < dataset.length; i++) {
            gauges.push(e(FillCircle, dataset[i]));
        }
        ReactDOM.render(e('div', {}, gauges), domContainer);
    }

    makeFiller(dataset);
    // ReactDOM.render(e(FillCircle, {
    //     style: { height: '40px' }
    // }), domContainer);
}