import React, {Component, Fragment} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import './codesList.scss';
import {PromoCodes, Orders} from "../../../../../lib/collections";
import {Meteor} from 'meteor/meteor';
import createPrompt from "../../../../functions/createPrompt";
import GeniusSpinner from "../../../../common/spinner/spinner";
import RenderCodeUses from "./renderCodeUses";
import {FlowRouter} from 'meteor/kadira:flow-router';

class CodesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCode: null
        };
        this.onOrderNumberClick = this.onOrderNumberClick.bind(this);
    }

    selectCode(id) {
        this.setState({selectedCode: id});
    }

    onOrderNumberClick(orderId) {
        FlowRouter.go(`/admin/orders/${orderId}`);
    }

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
                    <Fragment key={code._id}>
                        <div className='list-item' onClick={() => this.selectCode(code._id)}>
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
                        {this.state.selectedCode === code._id
                            && <RenderCodeUses uses={code.uses}
                                               onOrderNumberClick={this.onOrderNumberClick}
                               />
                        }
                    </Fragment>
                );
            });
        }
    }

    render() {
        if(!this.props.handleReady) return <GeniusSpinner/>;
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

export default withTracker(() => {
    let codes = [];
    const handle = Meteor.subscribe('promoCodes.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        codes = PromoCodes.find({}).fetch();
        for(let c of codes) {
            for(let u of c.uses) {
                const order = Orders.findOne({orderNumber: u.orderNumber}, {fields: {_id: 1}});
                if(order) {
                    u.orderId = order._id;
                }
            }
        }
    }

    return {
        handleReady,
        codes
    }

})(CodesList);

