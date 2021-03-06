import React, {Component} from 'react';
import SelectInput from "../../../../../../common/selectInput/selectInput";
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Collections} from "../../../../../../../lib/collections";
import createPrompt from "../../../../../../functions/createPrompt";
import GeniusSpinner from "../../../../../../common/spinner/spinner";

class EditCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collection: props.collection ? props.collection.name : 'brak kolekcji',
            collectionId: props.collection ? props.collection._id : ''
        };
        this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.selectValue = this.selectValue.bind(this);
    }

    selectValue(opt) {
        this.setState({collection: opt.name, collectionId: opt._id});
    }

    onSubmitBtnClick() {
        const collectionId = this.state.collectionId;
        const productId = this.props.productId;
        Meteor.call('editProductCollection', productId, collectionId, err => {
           if(!err) {
               Meteor.subscribe('product.admin', productId);
               this.props.closeModal();
               createPrompt('success', 'zmieniono');
           } else {
               console.error(err);
               switch(err.error) {
                   case 'notPermission':
                       return createPrompt('error', 'brak uprawnień');
                   case 'updateProductFailed':
                       return createPrompt('error', 'problem z edycją kolekcji');
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
        if(!this.props.handleReady) return <GeniusSpinner/>;
        return (
            <div className='edit-modal-wrap'>
                <div className='modal-title'>edytuj kolekcje</div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>Kolekcja</div>
                    <SelectInput options={this.props.collections}
                                 defaultValue={this.state.collection}
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

export default withTracker(() => {
    let collections = [];
    const handle = Meteor.subscribe('collections.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        collections = Collections.find({}).fetch();
    }

    return {
        handleReady,
        collections
    }

})(EditCollection);