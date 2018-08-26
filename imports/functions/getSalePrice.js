const getSalePrice = (price, sale) => {
    const salePrice = price - (price * sale / 100);
    return Math.round(salePrice * 100) / 100;
};

export default getSalePrice;