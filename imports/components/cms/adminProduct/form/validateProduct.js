export const validateProduct = (state) => {
    const {gender, name, collectionId, price, description, photos, sizes} = state;

    const sizeValidation = validateSizes(sizes);
    const photosValidation = validatePhotos(photos);
    const nameValidation = validateText(name);
    const priceValidation = validatePrice(price);
    const genderValidation = validateGender(gender);
    const collectionValidation = validateCollection(collectionId);
    const descriptionValidation = validateText(description);

    const inputs = [
        {text: 'nazwa produktu - pole obowiazkowe', name: 'name', value: nameValidation},
        {text: 'cena - pole obowiazkowe', name: 'price', value: priceValidation},
        {text: 'kolekcja - pole obowiazkowe', name: 'collectionId', value: collectionValidation},
        {text: 'plec - pole obowiazkowe', name: 'gender', value: genderValidation},
        {text: 'rozmiary - musisz podac conajmniej jeden rozmiar', name: 'sizes', value: sizeValidation},
        {text: 'opis - pole obowiazkowe', name: 'description', value: descriptionValidation},
        {text: 'zdjecia - musisz podac conajmneij jedo zdjecie', name: 'photos', value: photosValidation}
    ];

    const errors = inputs.filter(input => !input.value).map(input => input.text).join(' \n ');
    if(errors.length > 0) {
        alert(`niepoprawnie wypelnione pola: \n ${errors}`);
        return;
    } else {
        const product = {};
        for(let i=0; i<inputs.length; i++) {
            const name = inputs[i].name;
            const value = inputs[i].value;
            product[name] = value;
        }
        return product;
    }
};

const validateSizes = (sizes) => {
    const sizesArr = Object.keys(sizes).map(key => {
        console.log(sizes[key].value);
        console.log(!!sizes[key].value);
        return {
            name: sizes[key].name,
            value: !!sizes[key].value ? sizes[key].value : null,
            active: !!sizes[key].value && sizes[key].active
        };
    });
    const result = sizesArr.filter(size => size.value > 0 && size.active);
    if(result.length > 0) {
        return sizesArr;
    }
    return false;
};

const validatePhotos = (photos) => {
    const photosArr = Object.keys(photos).map(key => photos[key]);
    const result = photosArr.filter(photo => photo.length > 0);
    if(result.length > 0) {
        return result;
    }
    return false;
};

const validateText = text => {
    return typeof text === 'string' && text.length > 2 && text;
};

const validatePrice = number => {
    return typeof number === 'number' && number > 0 && number;
};

const validateGender = gender => {
    const genders = ['unisex', 'man', 'woman'];
    if(genders.indexOf(gender) !== -1 && typeof gender === 'string') {
        return gender;
    }
    return false;
}

const validateCollection = id => {
    return typeof id === 'string' && id.length > 2 && id;
}