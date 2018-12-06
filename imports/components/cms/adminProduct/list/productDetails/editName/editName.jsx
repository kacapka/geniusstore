import React, {Component} from 'react';
import createPrompt from "../../../../../../functions/createPrompt";

class EditName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name || ''
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
        const productId = this.props.productId;
        const name = this.state.name;
        if(name.trim().length > 2) {
            Meteor.call('editProductName', productId, name, err => {
                if(!err) {
                    this.props.closeModal();
                    createPrompt('success', 'zmieniono');
                } else {
                    console.error(err);
                    switch(err.error) {
                        case 'notPermission':
                            return createPrompt('error', 'brak uprawnień');
                        case 'updateProductFailed':
                            return createPrompt('error', 'problem z edycją nazwy produktu');
                        default:
                            return createPrompt('error', 'ups... wystąpił problem');
                    }
                }
            });
        } else {
            createPrompt('warning', 'zbyt krótka nazwa');
        }
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