import React, {Component} from 'react';
import createPrompt from "../../../../../../functions/createPrompt";

class EditDescription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            desc: props.desc || ''
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
        const desc = this.state.desc;
        Meteor.call('editProductDescription', productId, desc, err => {
            if(!err) {
                this.props.closeModal();
                createPrompt('success', 'zmieniono');
            } else {
                console.error(err);
                switch(err.error) {
                    case 'notPermission':
                        return createPrompt('error', 'brak uprawnień');
                    case 'updateProductFailed':
                        return createPrompt('error', 'problem z edycją opisu');
                    default:
                        return createPrompt('error', 'ups... wystąpił problem');
                }
            }
        });
    }

    onCancelNameBtnClick() {
        this.props.closeModal();
    }

    render() {
        return (
            <div className='edit-modal-wrap'>
                <div className='modal-title'>edytuj opis produktu</div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>Opis</div>
                    <textarea className='edit-textarea'
                           value={this.state.desc}
                           name='desc'
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

export default EditDescription;