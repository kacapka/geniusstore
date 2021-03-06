import React, {Component} from 'react';
import SelectInput from "../../../../../../common/selectInput/selectInput";
import {Meteor} from 'meteor/meteor';
import {Features} from '/lib/collections';
import {withTracker} from 'meteor/react-meteor-data';
import createPrompt from "../../../../../../functions/createPrompt";
import GeniusSpinner from "../../../../../../common/spinner/spinner";

class AddFeature extends Component {

    constructor(props) {
        super(props);
        this.state = {
            featureId: ''
        };
        this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.selectValue = this.selectValue.bind(this);
    }

    selectValue(opt) {
        this.setState({featureId: opt._id});
    }

    onSubmitBtnClick() {
        const productId = this.props.productId;
        const featureId = this.state.featureId;
        Meteor.call('addProductFeature', productId, featureId, err => {
            if(!err) {
                this.props.closeModal();
                createPrompt('success', 'dodano');
            } else {
                console.error(err);
                switch(err.error) {
                    case 'notPermission':
                        return createPrompt('error', 'brak uprawnień');
                    case 'addProductFeatureFailed':
                        return createPrompt('error', 'problem z dodaniem szczegółu');
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
        if(!this.props.handleReady) return <GeniusSpinner />;
        return (
            <div className='edit-modal-wrap'>
                <div className='modal-title'>dodaj szczegol</div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>szczegol</div>
                    <SelectInput options={this.props.features}
                                 selectValue={this.selectValue}
                                 className='modal-select'
                                 defaultValue='wybierz szczegol'
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

export default withTracker(props => {
    let features = [];
    const handle = Meteor.subscribe('features.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        const usedFeaturesIds = props.featuresIds;
        const allFeatures = Features.find({}).fetch();
        for(let f of allFeatures) {
            if(!~usedFeaturesIds.indexOf(f._id)) {
                features.push(f);
            }
        }
    }

    return {
        handleReady,
        features
    }
})(AddFeature);