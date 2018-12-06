import React, {Component} from 'react';
import './Admin.scss';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import AdminLogin from "./adminLogin/adminLogin";
import AdminNavbar from './adminNavbar/adminNavbar';

class Admin extends Component {

    render() {
        if(this.props.userId) {
            return (
                <div id='admin'>
                    <AdminNavbar />
                    <div id='adminContent'>
                        {this.props.content}
                    </div>
                    <div id='prompt' />
                </div>
            );
        } else {
            return <AdminLogin />
        }
    }
}

export default withTracker(() => {
    return {
        userId: Meteor.userId()
    }
})(Admin);