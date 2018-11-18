const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

export default function validateEmail(email) {
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
}