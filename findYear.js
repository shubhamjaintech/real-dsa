const fs = require('fs');
const path = require('path');

// complexity: O(Y*12)
function findYear(target) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const targetNum = Number(target);
    for (let i = 1000; i < 9334; i++) {
        const yearDir = path.join(__dirname, 'data', String(i));
        for (let j = 0; j < months.length; j++) {
            const filePath = path.join(yearDir, `${months[j]}.txt`);
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const m = content.match(/\[\[\s*Number of people:\s*(\d+)\s*\]\]/i);
                if (m) {
                    const fileValue = Number(m[1]);
                    if (fileValue === targetNum) {
                        return i;
                    }
                }
            } catch (err) {
                console.log(err);
                continue;
            }
        }
    }

    return -1;
}
function binarySearch(arr, target) {
    let l = 0;
    let h = arr.length - 1;
    let m;

    while (l < h) {
        m = Math.floor((l + h) / 2);
        if (arr[m] === target) return m;
        if (arr[m] < target) l = m + 1;
        else h = m - 1;
    }
    return -1;

}
const ar = [1, 2, 3, 4, 5, 6];
// console.log(binarySearch(ar, 5));

function getMonthValue(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const m = content.match(/\[\[\s*Number of people:\s*(\d+)\s*\]\]/i);
        if (m) {
            const fileValue = Number(m[1]);
            return fileValue;
        }
    } catch (err) {
        console.log(err);
    }

    return null;
}
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
// Complexity: O(Logy) + O(12)
function findYearBetter(target) {
    let l = 1000;
    let h = 9333;
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    while (l <= h) {
        let mid = Math.floor((l + h) / 2);
        const yearDir = path.join(__dirname, 'data', String(mid));
        const janVal = getMonthValue(path.join(yearDir, 'January.txt'));
        const decVal = getMonthValue(path.join(yearDir, 'December.txt'));
        if (target < janVal) {
            h = mid - 1;
        } else if (target > decVal) {
            l = mid + 1;
        }
        else {
            for (let m of months) {
                const mvalue = getMonthValue(path.join(yearDir, `${m}.txt`));
                if (mvalue === target) {
                    return mid;
                }
            }
            return -1;
        }
    }
    return -1;
}

// Complexity: O((endYear - startYear) * 12)
function findYearFlatten(target) {
    const startYear = 1000;
    const endYear = 9333;
    let l = 0;
    let h = ((endYear - startYear) * 12 ) -1;
    while (l <= h) {
        let mid = Math.floor((l + h) / 2);
        let row = startYear + Math.floor(mid / 12);
        let col = mid % 12;
        const filePath = path.join(__dirname, 'data', String(row), `${months[col]}.txt`)
        const v = getMonthValue(filePath);
        if(v==null){return -1};
        if (v === target) {
            return row;
        } else if (target < v) {
            h = mid - 1;
        } else {
            l = mid + 1;
        }
    }
}
console.log(findYearFlatten(50109608));