import { Meteor } from 'meteor/meteor';

//methods
import './methods/Products/insertProduct';
import './methods/Products/editProductName';
import './methods/Products/editProductCollection';
import './methods/Products/editProductPrice';
import './methods/Products/editProductGender';
import './methods/Products/editProductPromoStatus';
import './methods/Products/editProductNewStatus';
import './methods/Products/editProductSizes';
import './methods/Products/editProductDescription';
import './methods/Products/productPhoto/addProductPhoto';
import './methods/Products/productPhoto/deleteProductPhoto';
import './methods/Products/productFeature/deleteProductFeature';
import './methods/Products/productFeature/addProductFeature';
import './methods/Products/deleteProduct';
import './methods/Products/updateSaleProduct';
import './methods/Products/addNewEmptyProduct';

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
    WebApp.connectHandlers.use('/hello', (req, res, next) => {
        res.writeHead(200);
        res.end(`Hello world from: ${Meteor.release}`);
    });
});
