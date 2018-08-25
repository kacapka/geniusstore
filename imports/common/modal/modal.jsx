import React, {Component} from 'react';
import './modal.scss';

class Modal extends Component {

    render() {
        return (
            <div className='modal-wrap'>
                <div className='modal-content'>
                    {this.props.children}
                </div>
            </div>
        );
    }

}

export default Modal;