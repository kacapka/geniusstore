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

    onSelectOptionClick(value) {
        this.setState({
            isOpen: false,
            selectedValue: value
        });
        this.props.selectValue(value);
    }

    renderOptions() {
        const options = this.props.options;
        return options.map(opt => {
            const optionClassName = opt.extra ? 'select-option extra' : 'select-option';
            return (
                <div className={optionClassName} key={opt.value}
                     onClick={() => this.onSelectOptionClick(opt.value)}
                >
                    <div className='option-value'>{opt.value}</div>
                    {opt.extra && <div className='option-extra'>{opt.extra}</div>}
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