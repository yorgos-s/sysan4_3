//get the last element of the array
const getLast = (array) => {
    if (array && array.length > 0) {
        return array[array.length - 1];
        // w/ ES6  array.sort(-1)[0]  
        //    or   array.at(-1)
    }
    return undefined;
};

export default getLast;

