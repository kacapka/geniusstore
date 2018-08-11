import React, {Component} from 'react';
import './productCollections.scss';
import {Collections} from "../../../../../lib/collections";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor'
import dateAgo from '/imports/functions/dateAgo';

class ProductCollections extends Component {

    // onDeleteMessageClick(id) {
    //     if(window.confirm('czy na pewno chcesz usunąć tę wiadomość?')) {
    //         Meteor.call('deleteMessage', id, err => {
    //             if(!err) {
    //                 console.log('messaged deleteed success');
    //             } else {
    //                 alert('nie masz uprawnień so wykonania tej czynności');
    //             }
    //         });
    //     }
    // }

    // onMessageClick(e, id, isOpen) {
    //     if(!isOpen) {
    //         Meteor.call('setMessageAsRead', id, err => {
    //             if (!err) {
    //                 console.log('messaged opened');
    //             } else {
    //                 alert('nie masz uprawnień so wykonania tej czynności');
    //             }
    //         });
    //     }
    //     const message = e.target.closest('.message-box').lastChild;
    //     message.classList.toggle('message--open');
    // }

    // renderCollections() {
    //     const Collections = this.props.Collections;
    //     if(!Collections) return <div>nie masz żadnych wiadomości</div>;
    //     return Collections.map(message => {
    //         const messageClassName = !message.isOpen ? 'message-item message--unread' : 'message-item';
    //         return (
    //             <li className='message-box' key={message._id} onClick={(e) => this.onMessageClick(e, message._id, message.isOpen)}>
    //                 <div className={messageClassName}>
    //                     <div className='message-feature message-name'>{message.name}</div>
    //                     <div className='message-feature message-email'>{message.email}</div>
    //                     <div className='message-feature message-text'>{`${message.text.slice(0, 20)}...`}</div>
    //                     <div className='message-feature message-date'>{dateAgo(message.date).full}</div>
    //                     <div className='message-feature message-remove'>
    //                         <ion-icon name="remove-circle"
    //                                   onClick={() => this.onDeleteMessageClick(message._id)}
    //                         />
    //                     </div>
    //                 </div>
    //                 <div className='message-full-text'>{message.text}</div>
    //             </li>
    //         );
    //     });
    // }

    render() {
        console.log(this.props);
        return (
            <div id='productCollections'>
                colllection page
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