// Hoare partition technique
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low >= high) return;
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex);
    quickSort(arr, pivotIndex + 1, high);
    return arr;
}
function partition(arr, low, high) {
    const pivot = arr[Math.floor((low + high) / 2)];
    let left = low;
    let right = high;
    while (true) {
        while (arr[left] < pivot) {
            left++;
        }
        while (arr[right] > pivot) {
            right--;
        }
        if (left >= right) {
            return right;
        }
        [arr[left], arr[right]] = [arr[right], arr[left]];

        left++;
        right--;
    }
}

const arr = [7, 2, 1, 6, 8, 5, 3, 4];

console.log(quickSort(arr));