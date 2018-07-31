import { Meteor } from 'meteor/meteor';
import './methods/Products/insertProduct';
import './methods/Users/insertUser';
import './publish/publish_products';
import './data';

Meteor.startup(() => {
  // code to run on server at startup
});
