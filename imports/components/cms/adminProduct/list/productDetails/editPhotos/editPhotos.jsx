import React, {Component} from 'react';
import createPrompt from "../../../../../../functions/createPrompt";

class AddPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photo: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
    }

    onInputChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    onSubmitBtnClick() {
        const {productId, action} = this.props;
        const photo = this.state.photo;
        if(action === 'photos') {
            const exists = this.props.photos.some(ph => ph === photo);
            if(exists) return createPrompt('warning', 'nie można przypisać tego samoeg zdjęcia ponownie');

            Meteor.call('addProductPhoto', productId, photo, err => {
                if(!err) {
                    this.props.closeModal();
                    createPrompt('success', 'dodano');
                } else {
                    console.error(err);
                    switch(err.error) {
                        case 'notPermission':
                            return createPrompt('error', 'brak uprawnień');
                        case 'updateProductFailed':
                            return createPrompt('error', 'problem z dodaniem zdjęcia');
                        default:
                            return createPrompt('error', 'ups... wystąpił problem');
                    }
                }
            });
        } else if(action === 'main') {
            Meteor.call('addProductMainPhoto', productId, photo, err => {
                if(!err) {
                    this.props.closeModal();
                    createPrompt('success', 'dodano');
                } else {
                    console.error(err);
                    switch(err.error) {
                        case 'notPermission':
                            return createPrompt('error', 'brak uprawnień');
                        case 'updateProductFailed':
                            return createPrompt('error', 'problem z dodaniem głównego zdjęcia');
                        default:
                            return createPrompt('error', 'ups... wystąpił problem');
                    }
                }
            });
        }
    }

    onCancelBtnClick() {
        this.props.closeModal();
    }

    render() {
        return (
            <div className='edit-modal-wrap'>
                <div className='modal-title'>dodaj zdjecie</div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>Link</div>
                    <input className='edit-input'
                           value={this.state.photo}
                           type='text'
                           name='photo'
                           onChange={this.onInputChange}
                    />
                </div>
                <div className='modal-buttons-wrap'>
                    <div className='modal-btn-submit'
                         onClick={this.onSubmitBtnClick}
                    >
                        dodaj
                    </div>
                    <div className='modal-btn-cancel'
                         onClick={this.onCancelBtnClick}
                    >
                        cofnij
                    </div>
                </div>
            </div>
        )
    }

}

export default AddPhoto;