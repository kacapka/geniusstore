const getSalePrice = (product) => {
    if(product.sales.isActive) {
        return product.sales.salePrice;
    } else {
        return product.price;
    }
};

export default getSalePrice;