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

const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

export const validateEmail = (email) => {
    const emailSplit = email.split('@');
    if(emailSplit.length===2) {
        const localPart = emailSplit[0];
        if(localPart.length>=1 && !format.test(localPart)) {
            const domain = emailSplit[1];
            const domainSplit = domain.split('.');
            if(domainSplit.length > 1) {
                const resultDomain = domainSplit.map(string => {
                    if(string.length > 0) {
                        return !format.test(string);
                    }
                    return false;
                });
                if(resultDomain.indexOf(false) === -1) {
                    return true;
                }
            }
        }
    }
    return false;
};