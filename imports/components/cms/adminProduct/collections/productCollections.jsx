import React, {Component} from 'react';
import './productCollections.scss';
import {Collections} from "../../../../../lib/collections";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

class ProductCollections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isForm: false,
            isAdd: false,
            editValue: '',
            addValue: '',
            editId: null
        };
        this.onAddCollectionBtnClick = this.onAddCollectionBtnClick.bind(this);
        this.onCloseBtnClick = this.onCloseBtnClick.bind(this);
        this.onEditIconClick = this.onEditIconClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.submitAddCollection = this.submitAddCollection.bind(this);
        this.submitEditCollection = this.submitEditCollection.bind(this);
    }

    onDeleteCollectionClick(id) {
        if(window.confirm('usuniecie kolekcji spowoduje usuniecie jej rowniez do przypisanych produktow, czy napewno chesz kontynuowac?')) {
            Meteor.call('deleteCollection', id, err => {
                if(!err) {
                    console.log('collection deleteed success');
                } else {
                    alert('nie masz uprawnień so wykonania tej czynności');
                }
            });
        }
    }

    submitAddCollection() {
        const name = this.state.addValue;
        if(name.length < 2) {
            alert('nazwa kolekcji musi miec przynajmnije 2 litery');
            return;
        }
        const newCollection = {
            name
        };
        Meteor.call('insertCollection', newCollection, err => {
            if(!err) {
                console.log('collection insert success');
                this.setState({isForm: false, addValue: ''});
            } else {
                alert('bload podczas dodwania kolekcji');
            }
        });
    }

    submitEditCollection() {
        const name = this.state.editValue;
        const id = this.state.editId;
        if(name.length < 2) {
            alert('nazwa kolekcji musi miec przynajmnije 2 litery');
            return;
        };
        Meteor.call('editCollection', name, id, err => {
            if(!err) {
                console.log('collection insert success');
                this.setState({isForm: false, editId: null});
            } else {
                alert('bload podczas edycji kolekcji');
            }
        });
    }

    onAddCollectionBtnClick() {
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


    renderCollections() {
        const collections = this.props.collections;
        return collections.map(col => {
            if(col.isDefault) return;
            return (
                <li className='collection-item' key={col._id}>
                    <div>{col.name}</div>
                    <ion-icon name="close-circle" className='icon-red'
                              onClick={() => this.onDeleteCollectionClick(col._id)}
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
            <div id='productCollections'>
                <ul id='collectionsList'>
                    <li className='collection-item collection-item-header'>
                        <div>nazwa</div>
                    </li>
                    {this.props.handleReady && this.renderCollections()}
                </ul>
                <div id='collectionEdit'>
                    {(()=> {
                        if(this.state.isForm) {
                            const {addValue, editValue, isAdd} = this.state;
                            return (
                                <div id='collectionForm'>
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
                                                 onClick={this.submitAddCollection}
                                            >
                                                dodaj
                                            </div>
                                        :
                                            <div className='btn-form btn-form--green'
                                                 onClick={this.submitEditCollection}
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
                                <div id='addCollectionBtn'>
                                    <ion-icon name='add-circle-outline'
                                              onClick={this.onAddCollectionBtnClick}
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

})(ProductCollections);