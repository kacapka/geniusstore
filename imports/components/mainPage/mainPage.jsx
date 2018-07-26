import React, {Component} from 'react';
import './mainPage.scss';
import {withTracker} from 'meteor/react-meteor-data';
import {Products} from '/lib/collections';
import {Meteor} from 'meteor/meteor';

class MainPage extends Component {
    
    onBtnClick() {
        console.log('hey');
        console.log(Meteor);
        Meteor.call('addProduct', 'kacapka', err => {
            if(err) {
                console.log(err);
            }    
        });
    }

    render() {
        console.log(this.props);
        console.log(Products);
        return (
            <div id='mainPage'>
               <button onClick={() => this.onBtnClick()}>klik</button>  
            </div>
        );
    }

}

export default withTracker(() => {
    let products = [];
    const handle = Meteor.subscribe('products.public');
    const handleReady = handle.ready();
    console.log(handleReady);
    if(handleReady) {
        products = Products.find({}).fetch();
    }
    
    return {
        handleReady,
        products
    }
})(MainPage);