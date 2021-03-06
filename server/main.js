import { Meteor } from 'meteor/meteor';

//methods
import './methods/Products/insertProduct';
import './methods/Products/copyProduct';
import './methods/Products/editProductName';
import './methods/Products/editProductCollection';
import './methods/Products/editProductPrice';
import './methods/Products/editProductGender';
import './methods/Products/editProductPromoStatus';
import './methods/Products/editProductNewStatus';
import './methods/Products/editProductActiveStatus';
import './methods/Products/editProductSizes';
import './methods/Products/editProductDescription';
import './methods/Products/productPhoto/addProductPhoto';
import './methods/Products/productPhoto/deleteProductPhoto';
import './methods/Products/productPhoto/addProductMainPhoto';
import './methods/Products/productFeature/deleteProductFeature';
import './methods/Products/productFeature/addProductFeature';
import './methods/Products/productCommon/deleteCommonProduct';
import './methods/Products/productCommon/addCommonProduct';
import './methods/Products/updateProductSizeValue';
import './methods/Products/deleteProduct';
import './methods/Products/updateSaleProduct';
import './methods/Products/addNewEmptyProduct';
import './methods/PromoCodes/insertPromoCode';
import './methods/PromoCodes/deletePromoCode';
import './methods/PromoCodes/verifyPromoCode';
import './methods/PromoCodes/addUsePromoCode';
import './methods/Orders/insertOrder';
import './methods/Orders/deleteOrder';

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

import './functions/emails/sendEmail';
import './functions/emails/sendDeliveryConfirmation';
import './functions/emails/sendOrderConfirmation';

//publish
import './publish/publish_products';
import './publish/publish_messages';
import './publish/publish_collections';
import './publish/publish_features';
import './publish/publish_colors';
import './publish/publish_promoCodes';
import './publish/publish_orders';
import './publish/publish_navbar';

//fake data
// import './data';

Meteor.startup(() => {

    //mail setup
    process.env.MAIL_URL = 'smtps://postmaster@madeingenius.herokuapp.com:a47ad38de08d401151c29e0b8c1ee147-52cbfb43-74d624c@smtp.mailgun.org:587';

});
