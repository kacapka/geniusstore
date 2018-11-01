import React, {Component} from 'react';
import './switchInput.scss';

class SwitchInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            switchStatus: props.isActive
        };
        this.onSwitchInputChange = this.onSwitchInputChange.bind(this);
    }

    onSwitchInputChange(e) {
        this.setState({switchStatus: e.target.checked});
        this.props.selectValue(e.target.checked, this.props.name);
    }

    render() {
        const switchClassName = this.props.className ? `switch-input ${this.props.className}` : 'switch-input';
        return(
            <label className={switchClassName}>
                <input type="checkbox"
                       checked={this.state.switchStatus}
                       onChange={this.onSwitchInputChange}
                />
                <span className="switch-slider" />
            </label>
        );
    }

}

export default SwitchInput;