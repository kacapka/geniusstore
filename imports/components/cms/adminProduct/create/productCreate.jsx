import React, {Component} from 'react';
import './productCreate.scss';
import createPrompt from "../../../../functions/createPrompt";

class ProductCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
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
        const name = this.state.name;
        if(name.length < 2) {
            return createPrompt('warning', 'zbyt krótka nazwa produktu');
        } else {
            Meteor.call('addNewEmptyProduct', name, err => {
                if(!err) {
                    this.props.closeModal();
                    createPrompt('success', 'dodano produkt');
                } else {
                    console.error(err);
                    switch(err.error) {
                        case 'notPermission':
                            return createPrompt('error', 'brak uprawnień');
                        case 'productAddFailed':
                            return createPrompt('error', 'problem z dodaniem');
                        default:
                            return createPrompt('error', 'ups... wystąpił problem');
                    }
                }
            });
        }
    }

    onCancelNameBtnClick() {
        this.props.closeModal();
    }

    render() {
        return (
            <div className='edit-modal-wrap'>
                <div className='modal-title'>Nowy produkt</div>
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

export default ProductCreate;


