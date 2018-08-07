import {Mongo} from 'meteor/mongo';

export const Products = new Mongo.Collection('products');
export const Messages = new Mongo.Collection('messages');