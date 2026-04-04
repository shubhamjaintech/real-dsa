function secondLargest(arr) {
    let firstLargest = -Infinity;
    let secondLargest = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > firstLargest) {
            secondLargest = firstLargest;
            firstLargest = arr[i];
        } else if (arr[i] > secondLargest) {
            secondLargest = arr[i];
        }
    }
    console.log(firstLargest, secondLargest);
}
let ar = [1, 101, 0, -4, 7, 87, 100, 34];

// secondLargest(ar);
for (let i = 0; i < 4; i++) {
    let row = '';
    for (let j = 0; j < 4; j++) {
        row += '*';
    }
    console.log(row)
    // console.log('\n');
}

for (let i = 0; i < 4; i++) {
    let row = ''
    for (let j = 0; j <= i; j++) {
        row = row + '*';
    }
    console.log(row);
}

for (let i = 0; i < 5; i++) {
    let row = '';
    for (let j = 0; j < i + 1; j++) {
        row = row + (i + 1);
    }
    console.log(row);
}

for (let i = 5; i >= 0; i--) {
    let row = '';
    for (let j = 0; j < i; j++) {
        row += (j + 1);
    }
    console.log(row);
}

for (let i = 0; i < 5; i++) {
    let row = '';
    for (let j = 0; j < (5 - i); j++) {
        row += ' ';
    }
    for (let k = 0; k <= i; k++) {
        row += '*';
    }
    console.log(row);
}

for (let i = 0; i < 6; i++) {
    let row = ''
    for (let j = 0; j <= i; j++) {
        if (j % 2 === 0) {
            row += '1';
        } else {
            row += '0';
        }
    }
    console.log(row);
}

function sumOfDigits(n) {

    let retVal = 0;

    while (n > 0) {
        retVal += (n % 10);
        n = Math.floor(n / 10);
    }
    return retVal;
}

console.log(sumOfDigits(1234));

function isPalindrone(n) {
    let originalNumber = n;
    let rev = '';

    while (n > 0) {
        rev = rev + (n % 10);
        n = Math.floor(n / 10);
    }
    if (originalNumber == rev) {
        return true;
    }
    return false;
}

console.log(isPalindrone(21111112));

function removeDuplicates(arr) {
    let retVal = [];
    retVal.push(arr[0]);
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] != retVal[retVal.length - 1]) {
            retVal.push(arr[i]);
        }
    }

    return retVal;
}

function removeDuplicatesInplace(ar) {
    let i = 0;
    for (let j = 1; j < ar.length; j++) {
        if (ar[j] !==ar[i]) {
            i++;
            ar[i] = ar[j]
        }
    }
    ar.length = i + 1;

    return ar;
}

function removeElements(ar, target){
    let k=0;
    for(let i=0;i<ar.length;i++){
        if(ar[i]!==target){
            ar[k]=ar[i];
            k++;
        }
    }
    console.log(k);
    return ar;
}

// function reverseString(str){
    
//     console.log(str.)
// }

console.log(removeElements([1, 2, 3, 3, 3, 4, 4, 5, 8, 9], 3));