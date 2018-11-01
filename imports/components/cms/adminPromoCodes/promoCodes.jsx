import React, {Component} from 'react';
import './promoCode.scss';
import Modal from "../../../common/modal/modal";
import AddCode from "./addCode/addCode";

class PromoCodes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModal: false
        };
        this.onAddNewPromoCodeClick = this.onAddNewPromoCodeClick.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }

    onAddNewPromoCodeClick() {
        this.setState({isModal: true});
    }

    onModalClose() {
        this.setState({isModal: false});
    }

    render() {
        return (
            <div id='promoCodes'>
                <div className='promo-codes-bar'>
                    <div className='bar-title'>Kody promocyjne</div>
                    <div className='bar-btn'
                         onClick={this.onAddNewPromoCodeClick}
                    >
                        Dodaj
                    </div>
                </div>
                <div className='promo-codes-list'>
                    <div className='list-header'>
                        <div>Nazwa</div>
                        <div>Typ</div>
                        <div>Wartosc</div>
                        <div>Jednorazowy</div>
                        <div>Data waznosci</div>
                        <div className='list-icon'>Usun</div>
                    </div>
                </div>
                {this.state.isModal &&
                    <Modal>
                        <AddCode closeModal={this.onModalClose}/>
                    </Modal>
                }
            </div>
        )
    }

}

export default PromoCodes;