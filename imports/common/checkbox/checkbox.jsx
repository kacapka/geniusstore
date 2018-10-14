import React, {Component} from 'react';
import './checkbox.scss';

class Checkbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: props.defaultValue ? props.defaultValue : false
        };
        this.onCheckboxClick = this.onCheckboxClick.bind(this);
    }

    onCheckboxClick() {
        this.props.selectCheckbox(!this.state.isActive, this.props.name);
        this.setState({isActive: !this.state.isActive});
    }

    render() {
        const baseClassName = this.props.className ? `checkbox-active ${this.props.className}` : 'checkbox-active';
        const checkboxClassName = this.state.isActive ? `${baseClassName} on` : baseClassName;
        return(
            <div className='checkbox'
                 onClick={this.onCheckboxClick}
            >
                <div className={checkboxClassName} />
            </div>
        );
    }

}

export default Checkbox;