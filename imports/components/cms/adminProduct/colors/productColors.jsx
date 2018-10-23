import React, {Component} from 'react';
import './productColors.scss';
import {Colors} from "../../../../../lib/collections";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

class ProductColors extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='productColors'>
                ssss
            </div>
        );
    }
}

export default withTracker(() => {
    let colors = [];
    const handle = Meteor.subscribe('colors.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        colors = Colors.find({}).fetch();
    }

    return {
        handleReady,
        colors
    }

})(ProductColors);