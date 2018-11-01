import {Mongo} from 'meteor/mongo';

export const Products = new Mongo.Collection('products');
export const Messages = new Mongo.Collection('messages');
export const Collections = new Mongo.Collection('collections');
export const Features = new Mongo.Collection('features');
export const Colors = new Mongo.Collection('colors');
export const PromoCodes = new Mongo.Collection('promoCodes');