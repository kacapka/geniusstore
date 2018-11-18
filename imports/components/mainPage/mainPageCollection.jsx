import React, {Component} from 'react';
import './mainPage.scss';
import {withTracker} from 'meteor/react-meteor-data';
import {Collections} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import MainPage from "./mainPage";

class MainPageCollection extends Component {

    render() {
        const {handleReady, collection} = this.props;
        if(!handleReady) return <div>loading</div>;
        if(!collection) return <div>nie znaleziono kolekcji</div>;
        return (
            <div id='mainPage'>
                <div id='collectionTitle'>{collection.name}</div>
                <MainPage query={{collectionId: collection._id}} />
            </div>
        );
    }

}

export default withTracker((props) => {
    let collection = null;
    const handle = Meteor.subscribe('collection.public', props.collectionId);
    const handleReady = handle.ready();
    if(handleReady) {
        collection = Collections.findOne({_id: props.collectionId});
    }

    return {
        handleReady,
        collection
    }

})(MainPageCollection);