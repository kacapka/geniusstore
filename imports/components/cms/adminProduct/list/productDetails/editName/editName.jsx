import React, {Component} from 'react';

class EditName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.product.name || ''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitNameBtnClick = this.onSubmitNameBtnClick.bind(this);
        this.onCancelNameBtnClick = this.onCancelNameBtnClick.bind(this);
    }

    onInputChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    onSubmitNameBtnClick() {
        const productId = this.props.product._id;
        const name = this.state.name;
        Meteor.call('editProductName', productId, name, err => {
            if(!err) {
                this.props.closeModal();
            } else {
                window.alert(err.error);
            }
        });
    }

    onCancelNameBtnClick() {
        this.props.closeModal();
    }

    render() {
        return (
            <div className='edit-modal-wrap'>
                <div className='modal-title'>edytuj nazwe produktu</div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>Nazwa</div>
                    <input className='edit-input'
                           value={this.state.name}
                           type='text'
                           name='name'
                           onChange={this.onInputChange}
                    />
                </div>
                <div className='modal-buttons-wrap'>
                    <div className='modal-btn-submit'
                         onClick={this.onSubmitNameBtnClick}
                    >
                        zapisz
                    </div>
                    <div className='modal-btn-cancel'
                         onClick={this.onCancelNameBtnClick}
                    >
                        cofnij
                    </div>
                </div>
            </div>
        )
    }

}

export default EditName;