import {Products, Orders} from "../../lib/collections";
import {validateEmail, validateKeys} from './validation';

export default class SchemaOrder {

    constructor(order) {
        this.order = order;
        this.validationKeys = {
            products: this.validateProducts(order.products),
            price: this.validatePrice(order.price),
            deliveryType: this.validateDeliveryType(order.deliveryType),
            address: this.validateAddress(order.address),
            user: this.validateUser(order.user),
            status: this.validateStatus(order.status),
            deliveryStatus: this.validateStatus(order.deliveryStatus),
            promoCode: order.promoCode ? this.validateString(order.promoCode) : true,
            timestamp: true,
            notes: true
        }
    }

    validateProducts(products) {
        return products.every(product => {
           const amount = product.amount > 0;
           const id = !!Products.findOne({_id: product.productId});
           const size = product.size.length > 0 && typeof product.size === 'string';
           const price = product.price > 0 && typeof product.price === 'number';
           return amount && id && size && price;
        });
    }

    validatePrice(price) {
        return typeof price === 'number' && price >= 0;
    }

    validateDeliveryType(type) {
        return typeof type === 'string' && type.length > 0;
    }

    validateString(string) {
        return typeof string === 'string' && string.length > 1;
    }

    validateAddress(address) {
        const city = this.validateString(address.city);
        const zipCode = this.validateString(address.zipCode);
        const street = this.validateString(address.street);
        return city && zipCode && street;
    }
    
    validateUser(user) {
        const name = this.validateString(user.name);
        const surname = this.validateString(user.surname);
        const email = validateEmail(user.email);
        const phone = this.validateString(user.phone);
        return name && surname && email && phone;
    }

    validateStatus(status) {
        const statusTypes = ['pending', 'completed', 'rejected'];
        return statusTypes.indexOf(status) !== -1;
    }

    validate() {
        return validateKeys(this.order, this.validationKeys);
    }

    insert(callback) {
        if(this.validate()) {
            Orders.insert(this.order, err => {
                if(!err) {
                    callback(null);
                } else {
                    callback('insertOrderFailed');
                }
            })
        } else {
            callback('validationOrderFailed');
            console.log(this.validationKeys);
            console.log(this.order);
        }
    }


}