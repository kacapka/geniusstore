import React, {Component} from 'react';
import './selectInput.scss';

class SelectInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedValue: null
        };
        this.toggleOptions = this.toggleOptions.bind(this);
        this.closeOptions = this.closeOptions.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener('click', this.closeOptions);
    }
    componentWillUnmount() {
        document.body.removeEventListener('click', this.closeOptions);
    }

    closeOptions(e){
        if(e.target.closest('.select-options-wrapper')) return;
        this.setState({isOpen: false});
    }

    toggleOptions() {
        this.setState({isOpen: !this.state.isOpen});
    }

    onSelectOptionClick(opt) {
        if(opt.value === 0) return;
        this.setState({
            isOpen: false,
            selectedValue: opt.name
        });
        this.props.selectValue(opt.name);
    }

    renderOptions() {
        const options = this.props.options;
        return options.map(opt => {
            const isAviable = opt.value > 0;
            let aviableClassName = '';
            let aviableText = '';
            if(!isAviable) {
                aviableClassName = 'not-aviable';
                aviableText = 'niedosteony';
            } else {
                if(opt.value === 1) {
                    aviableClassName = 'last-one';
                    aviableText = 'ostatni';
                } else {
                    aviableClassName = 'aviable';
                    aviableText = 'dostepny';
                }
            }
            const optionClassName = !isAviable ? 'select-option disabled' : 'select-option';
            return (
                <div className={optionClassName} key={opt.id}
                     onClick={() => this.onSelectOptionClick(opt)}
                >
                    <div className='option-value'>{opt.name}</div>
                    <div className={`option-extra ${aviableClassName}`}>{aviableText}</div>
                </div>
            );
        });
    }

    render() {
        const selectClassName = this.props.className ? `select-input ${this.props.className}` : 'select-input';
        return(
            <div className={selectClassName}>
                {this.props.error && <div className='select-error'>{this.props.error}</div>}
                <div className='select-value'
                     onClick={this.toggleOptions}
                >
                    {this.state.selectedValue ? this.state.selectedValue : this.props.defaultValue}
                </div>
                {this.state.isOpen &&
                    <div className='select-options-wrapper'>
                        {this.renderOptions()}
                    </div>
                }
            </div>
        );
    }

}

export default SelectInput;