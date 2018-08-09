import React, {Component} from 'react';
import './adminMessages.scss';
import {Messages} from "../../../../lib/collections";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor'
import dateAgo from '/imports/functions/dateAgo';

class AdminMessages extends Component {

    onDeleteMessageClick(id) {
        if(window.confirm('czy na pewno chcesz usunąć tę wiadomość?')) {
            Meteor.call('deleteMessage', id, err => {
               if(!err) {
                   console.log('messaged deleteed success');
               } else {
                   alert('nie masz uprawnień so wykonania tej czynności');
               }
            });
        }
    }

    onMessageClick(e, id, isOpen) {
        if(!isOpen) {
            Meteor.call('setMessageAsRead', id, err => {
                if (!err) {
                    console.log('messaged opened');
                } else {
                    alert('nie masz uprawnień so wykonania tej czynności');
                }
            });
        }
        const message = e.target.closest('.message-box').lastChild;
        message.classList.toggle('message--open');
    }

    renderMessages() {
        const messages = this.props.messages;
        if(!messages) return <div>nie masz żadnych wiadomości</div>;
        return messages.map(message => {
            const messageClassName = !message.isOpen ? 'message-item message--unread' : 'message-item';
            return (
                <li className='message-box' key={message._id} onClick={(e) => this.onMessageClick(e, message._id, message.isOpen)}>
                   <div className={messageClassName}>
                       <div className='message-feature message-name'>{message.name}</div>
                       <div className='message-feature message-email'>{message.email}</div>
                       <div className='message-feature message-text'>{`${message.text.slice(0, 20)}...`}</div>
                       <div className='message-feature message-date'>{dateAgo(message.date).full}</div>
                       <div className='message-feature message-remove'>
                           <ion-icon name="remove-circle"
                                     onClick={() => this.onDeleteMessageClick(message._id)}
                           />
                       </div>
                   </div>
                   <div className='message-full-text'>{message.text}</div>
                </li>
            );
        });
    }

    render() {
        console.log(this.props.messages);
        return (
            <div id='adminMessages'>
                <ul id='messagesList'>
                    <li className='message-item message-header'>
                        <div className='message-feature message-name'>uzytkownik</div>
                        <div className='message-feature message-email'>email</div>
                        <div className='message-feature message-text'>wiadomosc</div>
                        <div className='message-feature message-date'>data</div>
                        <div className='message-feature message-remove'>usun</div>
                    </li>
                    {this.renderMessages()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    let messages = [];
    const handle = Meteor.subscribe('messages.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        messages = Messages.find({}).fetch();
    }

    return {
        handleReady,
        messages
    }

})(AdminMessages);