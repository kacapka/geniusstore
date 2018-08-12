import React, {Component} from 'react';
import './productFeatures.scss';
import {Features} from "../../../../../lib/collections";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

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
        if(window.confirm('czy na pewno chcesz usunąć ten opis?')) {
            Meteor.call('deleteFeature', id, err => {
                if(!err) {
                    console.log('feature deleteed success');
                } else {
                    alert('nie masz uprawnień so wykonania tej czynności');
                }
            });
        }
    }

    submitAddFeature() {
        const name = this.state.addValue;
        if(name.length < 2) {
            alert('nazwa opisu musi miec przynajmnije 2 litery');
            return;
        }
        const newFeature = {
            name
        };
        Meteor.call('insertFeature', newFeature, err => {
            if(!err) {
                console.log('feature insert success');
                this.setState({isForm: false, addValue: ''});
            } else {
                alert('bload podczas dodwania opisu');
            }
        });
    }

    submitEditFeature() {
        const name = this.state.editValue;
        const id = this.state.editId;
        if(name.length < 2) {
            alert('nazwa opisu musi miec przynajmnije 2 litery');
            return;
        };
        Meteor.call('editFeature', name, id, err => {
            if(!err) {
                console.log('feature insert success');
                this.setState({isForm: false, editId: null});
            } else {
                alert('bload podczas edycji opisu');
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
        if(features.length === 0) return <div>brak opisow</div>;
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
                    <li className='feature-item feature-item-header'>
                        <div>nazwa</div>
                    </li>
                    {this.props.handleReady && this.renderFeatures()}
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
                                    <span>dodaj kolekcje</span>
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