import React, {Component} from 'react';
import SelectInput from "../../../../../../common/selectInput/selectInput";
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Collections} from "../../../../../../../lib/collections";

class EditCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collection: props.collection.name || '',
            collectionId: props.collection._id || ''
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
           } else {
               console.error(err);
               window.alert(err.error);
           }
        });
    }

    onCancelBtnClick() {
        this.props.closeModal();
    }

    render() {
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