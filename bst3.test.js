const { Node, insert, buildBst } = require('./bst3');

test('insert creates root node when root is null', () => {
    let root = null;
    root = insert(root, 10);
    expect(root).not.toBeNull();
    expect(root.value).toBe(10);
    expect(root.left).toBeNull();
    expect(root.right).toBeNull();
});

test('insert nodes smaller values to the left and larger to the right', () => {
    let root = null;
    root = insert(root, 10);
    root = insert(root, 5);
    root = insert(root, 15);
    expect(root.value).toBe(10);
    expect(root.left.value).toBe(5);
    expect(root.right.value).toBe(15);
});

test('buildBst constructs expected tree from array', () => {
    const arr = [10, 5, 1, 7, 15, 12];
    const root = buildBst(arr);
    expect(root.value).toBe(10);
    expect(root.left.value).toBe(5);
    expect(root.left.left.value).toBe(1);
    expect(root.left.right.value).toBe(7);
    expect(root.right.value).toBe(15);
    expect(root.right.left.value).toBe(12);
});