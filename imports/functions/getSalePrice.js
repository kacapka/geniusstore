const getSalePrice = (price, sale) => {
    const salePrice = price - (price * sale / 100);
    return Math.round(salePrice);
};

export default getSalePrice;