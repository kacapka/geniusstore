import {Meteor} from 'meteor/meteor';
import {PromoCodes, Orders} from "../../lib/collections";
import checkIfAdmin from '../functions/checkIfAdmin';

Meteor.publish('promoCodes.admin', function() {
    if(checkIfAdmin(this.userId)) {
        const promoCodesC = PromoCodes.find({});
        const promoCodes = promoCodesC.fetch();
        let ordersNumbers = [];
        for(let pC of promoCodes) {
            for(let u of pC.uses) {
                ordersNumbers.push(u.orderNumber);
            }
        }
        const ordersC = Orders.find({orderNumber: {$in: ordersNumbers}}, {fields: {_id: 1, orderNumber: 1}});

        console.log(ordersC.fetch());

        return [
            promoCodesC,
            ordersC
        ]

    } else {
        return [];
    }
});