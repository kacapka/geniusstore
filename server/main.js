import { Meteor } from 'meteor/meteor';

//methods
import './methods/Products/insertProduct';
import './methods/Products/editProduct';
import './methods/Products/deleteProduct';
import './methods/Products/updateSaleProduct';

import './methods/Messages/insertMessage';
import './methods/Messages/deleteMessage';
import './methods/Messages/updateMessage';

import './methods/Collections/insertCollection';
import './methods/Collections/deleteCollection';
import './methods/Collections/editCollection';

import './methods/Features/insertFeature';
import './methods/Features/deleteFeature';
import './methods/Features/editFeature';

import './methods/Users/insertUser';

//publish
import './publish/publish_products';
import './publish/publish_messages';
import './publish/publish_collections';
import './publish/publish_features';

//fake data
import './data';

Meteor.startup(() => {
  // code to run on server at startup
});
