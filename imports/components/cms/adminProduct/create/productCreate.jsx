import React, {Component} from 'react';
import './productCreate.scss';
import ProductForm from "../form/productForm";


class ProductCreate extends Component {

    render() {
        return (
            <div id='productCreate'>
                <ProductForm action='create' />
            </div>
        );
    }

}

export default ProductCreate;


