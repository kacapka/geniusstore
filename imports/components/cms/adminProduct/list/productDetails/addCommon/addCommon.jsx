import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Products} from '/lib/collections';
import {withTracker} from 'meteor/react-meteor-data';
import createPrompt from "../../../../../../functions/createPrompt";
import GeniusSpinner from "../../../../../../common/spinner/spinner";

class AddCommon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedId: ''
        };
        this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
    }

    onSubmitBtnClick() {
        const {productId, common} = this.props
        const selectedId = this.state.selectedId;
        if(selectedId.length < 2) {
            return window.alert('zaznacz produkt');
        } else if(~common.indexOf(selectedId)) {
            return window.alert('ten produkt juz jest przypisany');
        } else {
            Meteor.call('addCommonProduct', productId, selectedId, err => {
                if(!err) {
                    Meteor.subscribe('product.admin', productId);
                    this.props.closeModal();
                    createPrompt('success', 'powiązano produkt');
                } else {
                    console.error(err);
                    switch(err.error) {
                        case 'notPermission':
                            return createPrompt('error', 'brak uprawnień');
                        case 'addCommonProductFailed':
                            return createPrompt('error', 'problem z powiązaniem produktu');
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

    onProductClick(id) {
        this.setState({selectedId: id});
    }

    renderProducts() {
        if(!this.props.products.length) return <div>brak produktów</div>;
        return this.props.products.map(product => {
            const wrapClassName = product._id === this.state.selectedId ? 'product-wrap active' : 'product-wrap';
            return (
                <div key={product._id}
                     className={wrapClassName}
                     onClick={() => this.onProductClick(product._id)}
                >
                    <img className='product-thumbnail' src={product.mainPhoto} />
                    <div className='product-name'>{product.name}</div>
                </div>
            )
        })
    }

    render() {
        if(!this.props.handleReady) return <GeniusSpinner />;
        return (
            <div className='edit-modal-wrap'>
                <div className='modal-title'>wybierz produkt powiazany kolorem</div>
                <div className='modal-products-wrap'>
                    {this.renderProducts()}
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

export default withTracker(() => {
    let products = [];
    const handle = Meteor.subscribe('products.modal.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        products = Products.find({}, {fields: {_id: 1, mainPhoto:1, name:1}}).fetch();
    }

    return {
        handleReady,
        products
    }
})(AddCommon);