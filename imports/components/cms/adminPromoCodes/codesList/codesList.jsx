import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import './codesList.scss';
import {PromoCodes} from "../../../../../lib/collections";
import {Meteor} from 'meteor/meteor';
import createPrompt from "../../../../functions/createPrompt";

class CodesList extends Component {

    onDeleteCodeClick(id) {
        if(window.confirm('Czy na pewno chcesz usnac ten kod?')) {
            Meteor.call('deletePromoCode', id, err => {
                if(!err) {
                    createPrompt('success', 'usunięto');
                } else {
                    console.error(err);
                    switch(err.error) {
                        case 'notPermission':
                            return createPrompt('error', 'brak uprawnień');
                        case 'promoCodeDeleteFailed':
                            return createPrompt('error', 'problem z usunięciem');
                        default:
                            return createPrompt('error', 'ups... wystąpił problem');
                    }
                }
            })
        }
    }

    renderList() {
        const codes = this.props.codes;
        if(codes.length === 0) {
            return <div>brak kodow</div>;
        } else {
            return codes.map(code => {
                return (
                    <div className='list-item' key={code._id}>
                        <div className='list-feature'>{code.name}</div>
                        <div className='list-feature'>{code.type}</div>
                        <div className='list-feature'>{code.value}</div>
                        <div className='list-feature'>{code.singleUse ? 'TAK' : 'NIE'}</div>
                        <div className='list-feature'>{code.exp.toLocaleString()}</div>
                        <div className='list-icon remove-icon'>
                            <ion-icon name="remove-circle"
                                      onClick={() => this.onDeleteCodeClick(code._id)}
                            />
                        </div>
                    </div>
                );
            });
        }
    }

    render() {
        if(!this.props.handleReady) return <div>loading...</div>;
        return(
            <div id='codesList'>
                <div className='list-header'>
                    <div className='list-feature'>Nazwa</div>
                    <div className='list-feature'>Typ</div>
                    <div className='list-feature'>Wartosc</div>
                    <div className='list-feature'>Jednorazowy</div>
                    <div className='list-feature'>Data waznosci</div>
                    <div className='list-icon'>Usun</div>
                </div>
                {this.renderList()}
            </div>
        );
    }
}

export default withTracker(props => {
    let codes = [];
    const handle = Meteor.subscribe('promoCodes.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        codes = PromoCodes.find({}).fetch();
    }

    return {
        handleReady,
        codes
    }
})(CodesList);

