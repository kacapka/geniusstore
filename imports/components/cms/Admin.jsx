import React, {Component} from 'react';
import './Admin.scss';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import AdminLogin from "./adminLogin/adminLogin";

class Admin extends Component {

    render() {
        if(this.props.userId) {
            return (
                <div id='admin'>
                    admin !
                    {this.props.content}
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