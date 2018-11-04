import React, {Component} from 'react';
import './promoCode.scss';
import Modal from "../../../common/modal/modal";
import AddCode from "./addCode/addCode";
import CodesList from "./codesList/codesList";

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
                <CodesList />
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