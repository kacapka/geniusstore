import React, {Component} from 'react';
import './Admin.scss';
import {Meteor} from 'meteor/meteor';

class Admin extends Component {

    render() {

        return (
            <div id='admin'>
                admin !
                {this.props.content}
            </div>
        );
    }
}

export default Admin;