import React, {Component} from 'react';

class EditPrice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            price: props.price || 0
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
    }

    onInputChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: Number(value)});
    }

    onSubmitBtnClick() {
        const productId = this.props.productId;
        const price = this.state.price;
        if(price > 0) {
            Meteor.call('editProductPrice', productId, price, err => {
                if(!err) {
                    this.props.closeModal();
                } else {
                    window.alert(err.error);
                }
            });
        } else {
            alert('cena musi byc wieksza od zera');
        }
    }

    onCancelBtnClick() {
        this.props.closeModal();
    }

    render() {
        return (
            <div className='edit-modal-wrap'>
                <div className='modal-title'>edytuj cene produktu</div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>Cena</div>
                    <input className='edit-input'
                           value={this.state.price}
                           type='number'
                           name='price'
                           onChange={this.onInputChange}
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

export default EditPrice;