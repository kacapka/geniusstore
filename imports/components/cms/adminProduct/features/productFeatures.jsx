import React, {Component} from 'react';
import './productFeatures.scss';
import {Features} from "../../../../../lib/collections";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import createPrompt from "../../../../functions/createPrompt";
import GeniusSpinner from "../../../../common/spinner/spinner";

class ProductFeatures extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isForm: false,
            isAdd: false,
            editValue: '',
            addValue: '',
            editId: null
        };
        this.onAddFeatureBtnClick = this.onAddFeatureBtnClick.bind(this);
        this.onCloseBtnClick = this.onCloseBtnClick.bind(this);
        this.onEditIconClick = this.onEditIconClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.submitAddFeature = this.submitAddFeature.bind(this);
        this.submitEditFeature = this.submitEditFeature.bind(this);
    }

    onDeleteFeatureClick(id) {
        if(window.confirm('czy na pewno chcesz usunąć szczegół?')) {
            Meteor.call('deleteFeature', id, err => {
                if(!err) {
                    createPrompt('success', 'usunięto');
                } else {
                    console.error(err);
                    switch(err.error) {
                        case 'notPermission':
                            return createPrompt('error', 'brak uprawnień');
                        case 'featureRemoveFailed':
                            return createPrompt('error', 'problem z usunięciem');
                        default:
                            return createPrompt('error', 'ups... wystąpił problem');
                    }
                }
            });
        }
    }

    submitAddFeature() {
        const name = this.state.addValue;
        if(name.length < 2) {
            return createPrompt('warning', 'zbyt krótka nazwa');
        }
        const newFeature = {
            name
        };
        Meteor.call('insertFeature', newFeature, err => {
            if(!err) {
                createPrompt('success', 'dodano');
                this.setState({isForm: false, addValue: ''});
            } else {
                console.error(err);
                switch(err.error) {
                    case 'notPermission':
                        return createPrompt('error', 'brak uprawnień');
                    case 'insertFailed':
                        return createPrompt('error', 'problem z dodaniem');
                    default:
                        return createPrompt('error', 'ups... wystąpił problem');
                }
            }
        });
    }

    submitEditFeature() {
        const name = this.state.editValue;
        const id = this.state.editId;
        if(name.length < 2) {
            return createPrompt('warning', 'zbyt krótka nazwa');
        };
        Meteor.call('editFeature', name, id, err => {
            if(!err) {
                createPrompt('success', 'zmieniono');
                this.setState({isForm: false, editId: null});
            } else {
                console.error(err);
                switch(err.error) {
                    case 'notPermission':
                        return createPrompt('error', 'brak uprawnień');
                    case 'updateFeatureFailed':
                        return createPrompt('error', 'problem z edycją');
                    default:
                        return createPrompt('error', 'ups... wystąpił problem');
                }
            }
        });
    }

    onAddFeatureBtnClick() {
        this.setState({
            isForm: true,
            isAdd: true
        });
    }

    onCloseBtnClick() {
        this.setState({isForm: false, addValue: ''});
    }

    onEditIconClick(name, id) {
        this.setState({
            isForm: true,
            isAdd: false,
            editValue: name,
            editId: id
        });
    }

    onInputChange(e) {
        const value = e.target.value;
        if(this.state.isAdd) {
            this.setState({addValue: value});
        } else {
            this.setState({editValue: value});
        }
    }


    renderFeatures() {
        const features = this.props.features;
        if(!features.length) return <div>brak dodanych szczegółów</div>;
        return features.map(col => {
            return (
                <li className='feature-item' key={col._id}>
                    <div>{col.name}</div>
                    <ion-icon name="close-circle" className='icon-red'
                              onClick={() => this.onDeleteFeatureClick(col._id)}
                    />
                    <ion-icon name="create" className='icon-green'
                              onClick={() => this.onEditIconClick(col.name, col._id)}
                    />
                </li>
            );
        })
    }


    render() {
        return (
            <div id='productFeatures'>
                <ul id='featuresList'>
                    <li className='feature-item-header'>
                        <div>nazwa</div>
                    </li>
                    {this.props.handleReady ? this.renderFeatures() : <GeniusSpinner/>}
                </ul>
                <div id='featureEdit'>
                    {(()=> {
                        if(this.state.isForm) {
                            const {addValue, editValue, isAdd} = this.state;
                            return (
                                <div id='featureForm'>
                                    <div className='input-wrapper'>
                                        <label>nazwa</label>
                                        <input value={isAdd ? addValue : editValue}
                                                type='text'
                                               onChange={this.onInputChange}
                                        />
                                    </div>
                                    <div id='buttonsWrapper'>
                                        {this.state.isAdd ?
                                            <div className='btn-form btn-form--green'
                                                 onClick={this.submitAddFeature}
                                            >
                                                dodaj
                                            </div>
                                        :
                                            <div className='btn-form btn-form--green'
                                                 onClick={this.submitEditFeature}
                                            >
                                                zapisz
                                            </div>

                                        }
                                        <div className='btn-form btn-form--red'
                                             onClick={this.onCloseBtnClick}
                                        >
                                            cofnij
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div id='addFeatureBtn'>
                                    <ion-icon name='add-circle-outline'
                                              onClick={this.onAddFeatureBtnClick}
                                    />
                                    <span>dodaj szczegół</span>
                                </div>
                            )
                        }
                    })()}
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    let features = [];
    const handle = Meteor.subscribe('features.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        features = Features.find({}).fetch();
        console.log(features);
    }

    return {
        handleReady,
        features
    }

})(ProductFeatures);