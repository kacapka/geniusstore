import React, {Component} from 'react';

class CheckoutPromoCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            promoCode: ''
        };

        this.onPromoCodeInputChange = this.onPromoCodeInputChange.bind(this);
        this.verifyPromoCode = this.verifyPromoCode.bind(this);
    }

    onPromoCodeInputChange(e) {
        this.setState({promoCode: e.target.value});
    }

    verifyPromoCode() {
        const promoCode = this.state.promoCode.toLowerCase();
        Meteor.call('verifyPromoCode', promoCode, err => {
            if(!err) {
                console.log('promo code valid!');
            } else {
                alert(err.error);
            }
        });
    }

    render() {
        return(
            <div className='promo-code-wrap'>
                <input className='promo-code-input'
                       placeholder='kod promocyjny'
                       type='text'
                       onChange={this.onPromoCodeInputChange}
                       value={this.state.promoCode}
                />
                <div className='verify-btn'
                     onClick={this.verifyPromoCode}
                >
                    zweryfikuj
                </div>
            </div>
        )
    }

}

export default CheckoutPromoCode;