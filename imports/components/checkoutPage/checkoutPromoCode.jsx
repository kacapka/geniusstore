import React, {Component, Fragment} from 'react';
import {Meteor} from 'meteor/meteor';
import createPrompt from "../../functions/createPrompt";

class CheckoutPromoCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            promoCode: '',
            activeCode: false
        };

        this.onPromoCodeInputChange = this.onPromoCodeInputChange.bind(this);
        this.verifyPromoCode = this.verifyPromoCode.bind(this);
        this.removeCode = this.removeCode.bind(this);
    }

    componentWillUnmount() {
        this.props.setPromoCode(null);
    }

    onPromoCodeInputChange(e) {
        this.setState({promoCode: e.target.value});
    }

    removeCode() {
        this.setState({activeCode: false, promoCode: ''});
        this.props.setPromoCode(null);
    }

    verifyPromoCode() {
        const promoCode = this.state.promoCode.toLowerCase();
        Meteor.call('verifyPromoCode', promoCode, (err, res) => {
            if(!err) {
                this.props.setPromoCode(res);
                this.setState({activeCode: true});
                createPrompt('success', 'kod dodany');
            } else {
                switch (err.error) {
                    case 'invalidPromoCode':
                        return createPrompt('error', 'niepoprawny kod');
                    case 'expiredPromoCode':
                        return createPrompt('error', 'ważność kodu wygasła');
                    case 'usedPromoCode':
                        return createPrompt('error', 'kod zużyty');
                    default:
                        return createPrompt('error', 'błąd');
                }
            }
        });
    }

    render() {
        return(
            <div className='promo-code-wrap'>
                {this.state.activeCode
                    ?
                    <Fragment>
                        <div className='code'>{this.state.promoCode}</div>
                        <div className='remove-circle'>
                            <ion-icon name="remove-circle"
                                      onClick={this.removeCode}
                            />
                        </div>
                    </Fragment>
                    :
                    <Fragment>
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
                    </Fragment>
                }
            </div>
        )
    }

}

export default CheckoutPromoCode;