// Complexity O(logn) 
function binaryToDecimal(n) {
    let retVal = '';
    while (n > 0) {
        retVal = n % 2 + retVal;
        n = Math.floor(n / 2);
    }
    return retVal;

}

function binaryToDecimalBitwise(n) {
    let retVal = '';
    while (n > 0) {
        retVal = (n & 1) + retVal;
        n = n >> 1;
    }
    return retVal;
}

function binaryToDecimalBuiltIn(n) {
    return n.toString(2);
}

function binaryToDecimalRecursive(n) {
    if (n === 0) {
        return "";
    }
    return (binaryToDecimalRecursive(Math.floor(n / 2)) + n % 2);
}
console.log(binaryToDecimalRecursive(10));