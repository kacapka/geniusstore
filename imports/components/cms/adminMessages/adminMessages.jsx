import React, {Component, Fragment} from 'react';
import './adminMessages.scss';
import {Messages} from "../../../../lib/collections";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor'
import dateAgo from '/imports/functions/dateAgo';
import createPrompt from "../../../functions/createPrompt";
import GeniusSpinner from "../../../common/spinner/spinner";

class AdminMessages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMessage: null
        }
    }

    onDeleteMessageClick(id) {
        if(window.confirm('czy na pewno chcesz usunąć tę wiadomość?')) {
            Meteor.call('deleteMessage', id, err => {
               if(!err) {
                   createPrompt('success', 'usunięto');
               } else {
                   console.error(err);
                   switch(err.error) {
                       case 'notPermission':
                           return createPrompt('error', 'brak uprawnień');
                       case 'deleteMessageFailed':
                           return createPrompt('error', 'problem z usunięciem');
                       default:
                           return createPrompt('error', 'ups... wystąpił problem');
                   }
               }
            });
        }
    }

    onMessageClick(id, isOpen) {
        if(!isOpen) {
            Meteor.call('setMessageAsRead', id, err => {
                if (!err) {
                } else {
                }
            });
        }
        this.setState({selectedMessage: id});
    }

    renderMessages() {
        const messages = this.props.messages;
        if(!messages) return <div>nie masz żadnych wiadomości</div>;
        return messages.map(message => {
            const messageClassName = !message.isOpen ? 'message-item message--unread' : 'message-item';
            return (
                <li className='message-box' key={message._id} onClick={() => this.onMessageClick(message._id, message.isOpen)}>
                   <div className={messageClassName}>
                       <div className='message-feature message-name'>{message.name}</div>
                       <div className='message-feature message-email mobile'>{message.email}</div>
                       <div className='message-feature message-text mobile'>{`${message.text.slice(0, 20)}...`}</div>
                       <div className='message-feature message-date'>{dateAgo(message.date).full}</div>
                       <div className='message-feature message-remove'>
                           <ion-icon name="remove-circle"
                                     onClick={() => this.onDeleteMessageClick(message._id)}
                           />
                       </div>
                   </div>
                    {this.state.selectedMessage === message._id &&
                        <Fragment>
                            <div className='mobile-mail'>Od: <span>{message.email}</span></div>
                            <div className='message-full-text'>{message.text}</div>
                        </Fragment>
                    }
                </li>
            );
        });
    }

    render() {
        return (
            <div id='adminMessages'>
                <div className='messages-bar'>
                    <div className='bar-title'>Wiadomości</div>
                </div>
                <ul id='messagesList'>
                    <li className='message-header'>
                        <div className='message-feature message-name'>uzytkownik</div>
                        <div className='message-feature message-email mobile'>email</div>
                        <div className='message-feature message-text mobile'>wiadomosc</div>
                        <div className='message-feature message-date'>data</div>
                        <div className='message-feature message-remove'>usun</div>
                    </li>
                    {this.props.handleReady ? this.renderMessages() : <GeniusSpinner /> }
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