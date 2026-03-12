// Complexity O(logn) 
function decimalToBinary(n) {
    let retVal = '';
    while (n > 0) {
        retVal = n % 2 + retVal;
        n = Math.floor(n / 2);
    }
    return retVal;

}

function decimalToBinaryBitwise(n) {
    let retVal = '';
    while (n > 0) {
        retVal = (n & 1) + retVal;
        n = n >> 1;
    }
    return retVal;
}

function decimalToBinaryBuiltIn(n) {
    return n.toString(2);
}

function decimalToBinaryRecursive(n) {
    if (n === 0) {
        return "";
    }
    return (decimalToBinaryRecursive(Math.floor(n / 2)) + n % 2);
}
console.log(decimalToBinaryRecursive(10));