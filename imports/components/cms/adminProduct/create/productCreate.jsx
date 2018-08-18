import React, {Component} from 'react';
import './productCreate.scss';
import ProductForm from "../form/productForm";


class ProductCreate extends Component {

    render() {
        return (
            <ProductForm action='create' />
        );
    }

}

export default ProductCreate;


