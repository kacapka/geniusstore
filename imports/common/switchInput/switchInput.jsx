import React, {Component} from 'react';
import './switchInput.scss';

class SwitchInput extends Component {

    constructor(props) {
        // super(props);
        // this.state = {
        //     isOpen: false,
        //     selectedValue: null
        // };
        // this.toggleOptions = this.toggleOptions.bind(this);
        // this.closeOptions = this.closeOptions.bind(this);
    }

    render() {
        return(
            <label className="switch-input">
                <input type="checkbox" />
                <span className="switch-slider" />
            </label>
        );
    }

}

export default SwitchInput;