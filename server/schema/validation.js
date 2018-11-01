export const validateKeys = (data, keysValidations) => {
    const validKeysQty = Object.keys(data).length <= Object.keys(keysValidations).length;
    for(let key in keysValidations) {
        const keyValue = keysValidations[key];
        if(!(typeof keyValue==='object')) {
            if(!keyValue) {
                return false;
            }
        } else {
            if(keyValue instanceof Array) {
                for(let i=0; i<keyValue.length; i++) {
                    if(!validateObject(keyValue[i])) {
                        return false
                    }
                }
            } else {
                if(!validateObject(keyValue)) {
                    return false;
                }

            }
        }
    }
    return validKeysQty;
};

function validateObject(obj) {
    for (let key in obj) {
        if (!obj[key]) {
            return false;
        }
    }
    return true;
}