import React, {Component} from 'react';
import SelectInput from "../../../../../../common/selectInput/selectInput";
import {Meteor} from 'meteor/meteor';
import createPrompt from "../../../../../../functions/createPrompt";

const GENDERS = [
    {name: 'unisex'},
    {name: 'man'},
    {name: 'woman'}
];

class EditGender extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gender: props.gender
        };
        this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.selectValue = this.selectValue.bind(this);
    }

    selectValue(opt) {
        this.setState({gender: opt.name});
    }

    onSubmitBtnClick() {
        const gender = this.state.gender;
        const productId = this.props.productId;
        Meteor.call('editProductGender', productId, gender, err => {
            if(!err) {
                this.props.closeModal();
                createPrompt('success', 'zmieniono');
            } else {
                console.error(err);
                switch(err.error) {
                    case 'notPermission':
                        return createPrompt('error', 'brak uprawnień');
                    case 'updateProductFailed':
                        return createPrompt('error', 'problem z edycją rodzaju płci');
                    default:
                        return createPrompt('error', 'ups... wystąpił problem');
                }
            }
        });
    }

    onCancelBtnClick() {
        this.props.closeModal();
    }

    render() {
        return (
            <div className='edit-modal-wrap'>
                <div className='modal-title'>edytuj plec</div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>Plec</div>
                    <SelectInput options={GENDERS}
                                 defaultValue={this.state.gender}
                                 selectValue={this.selectValue}
                                 className='modal-select'
                    />
                </div>
                <div className='modal-buttons-wrap'>
                    <div className='modal-btn-submit'
                         onClick={this.onSubmitBtnClick}
                    >
                        zapisz
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

export default EditGender;