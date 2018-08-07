import { Meteor } from 'meteor/meteor';

//methods
import './methods/Products/insertProduct';
import './methods/Messages/insertMessage';
import './methods/Messages/deleteMessage';
import './methods/Messages/updateMessage';
import './methods/Users/insertUser';

//publish
import './publish/publish_products';
import './publish/publish_messages';

//fake data
import './data';

Meteor.startup(() => {
  // code to run on server at startup
});
