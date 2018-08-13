export const validateProduct = (state) => {
    const {isActive, isNew, isSale, gender, name, collectionId, price, description, photos, unisex, S, M, L, XL} = state;
    const sizes = [
        {name: 'unisex', value: unisex.value},
        {name: 'S', value: S.value},
        {name: 'M', value: M.value},
        {name: 'L', value: L.value},
        {name: 'XL', value: XL.value}
    ];
    // const sizeValidation = validateSizes(sizes);
    // if(!sizeValidation) {
    //     alert('musisz wybrac przynajmniej jeden rozmiar');
    //     return;
    // };
    //
    // const photosValidation = validatePhotos(photos);
    // if(!photosValidation) {
    //     alert('musisz dodac co najmniej jedna zdjecie');
    //     return;
    // };

    // const nameValidation = validateText(name);
    // if(!nameValidation) {
    //     alert('pole "nazwa" nie moze byc puste');
    //     return;
    // };

    // const priceValidation = validatePrice(price);
    // if(!priceValidation) {
    //     alert('musisz podac cene');
    //     return;
    // }

    // const genderValidation = validateGender(gender);
    // if(!genderValidation) {
    //     alert('musisz wybrac plec');
    //     return;
    // }

    const collectionValidation = validateCollection(collectionId);
    if(!collectionValidation) {
        if(!window.confirm('nie wybrano kolekcji, czy mimo to chcesz kontynuowac?')){
            return;
        };
    }

    // const descriptionValidation = validateText(description);
    // if(!descriptionValidation) {
    //     if(!window.confirm('opis produktu nie zostal wprowadzony, czy mimo to chcesz kontynuowac?')) {
    //         return;
    //     };
    // }
};

const validateSizes = (sizes) => {
    console.log(sizes);
    const result = sizes.filter(size => size.value);
    if(result.length > 0) {
        return result;
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
    return typeof text === 'string' && text.length > 2;
};

const validatePrice = number => {
    return typeof number === 'number' && number > 0;
};

const validateGender = gender => {
    const genders = ['unisex', 'man', 'woman'];
    if(genders.indexOf(gender) !== -1 && typeof gender === 'string') {
        return gender;
    }
    return false;
}

const validateCollection = id => {
    return typeof id === 'string' && id.length > 2;
}