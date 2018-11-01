const zipcodeValidation = zipcode => {
    return zipcode.length < 7 && zipcode.length > 5;
};

export default zipcodeValidation;