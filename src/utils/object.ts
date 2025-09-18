const cleanKeys = (obj: any): any => {
    if (obj instanceof Array) {
        return obj.map(item => cleanKeys(item));
    } else if (obj !== null && typeof obj === 'object') {
        const newObj: any = {};
        for (let key in obj) {
            // check if the key has a colon
            let newKey = key.replace(':', ''); // Remove colon from key
            newObj[newKey] = cleanKeys(obj[key]);
        }
        return newObj;
    } else {
        return obj;
    }
}


export default cleanKeys;
