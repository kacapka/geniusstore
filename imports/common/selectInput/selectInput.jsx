import React, {Component} from 'react';
import './selectInput.scss';

class SelectInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedValue: props.selectedValue ? props.selectedValue : null
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
        if(opt.value <= 0) return;
        this.setState({
            isOpen: false,
            selectedValue: opt.name
        });
        this.props.selectValue(opt, this.props.selectName); //to do change sizes with ids! before was as argument opt.name
    }

    renderOptions() {
        const options = this.props.options;
        if(options.length === 0) {
            return (
                <div className='select-option'>
                    <div className='option-value'>{this.props.noOptionsText}</div>
                </div>
            );
        }
        return options.map(opt => {
            // if(opt.active === false) return;
            // const value = Number(opt.value);
            // let aviableClassName = '';
            // let aviableText = '';
            // let isAviable;
            // if(value >= 0) {
            //     isAviable = value > 0;
            //     if (!isAviable) {
            //         aviableClassName = 'not-aviable';
            //         aviableText = 'niedosteony';
            //     } else {
            //         if (opt.value === 1) {
            //             aviableClassName = 'last-one';
            //             aviableText = 'ostatni';
            //         } else {
            //             aviableClassName = 'aviable';
            //             aviableText = 'dostepny';
            //         }
            //     }
            // }
            // const optionClassName = (value <= 0) ? 'select-option disabled' : 'select-option';
            return (
                <div className='select-option' key={opt.name}
                     onClick={() => this.onSelectOptionClick(opt)}
                >
                    <div className='option-value'>{opt.name}</div>
                    {/*{(value >= 0) && <div className={`option-extra ${aviableClassName}`}>{aviableText}</div>}*/}
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