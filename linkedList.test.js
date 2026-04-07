const { LinkedList } = require('./linkedList');
    describe('LinkedList operations', () => {
        function toArray(list) {
            const out = [];
            let cur = list.head;
            while (cur) {
                out.push(cur.value);
                cur = cur.next;
            }
            return out;
        }
        test('append should add nodes at the end and update head, tail, size', () => {
            const list = new LinkedList();
            list.append(1);
            expect(list.head).not.toBeNull();
            expect(list.tail).not.toBeNull();
            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(1);
            expect(list.size).toBe(1);

            list.append(2);
            expect(list.head.value).toBe(1);
            expect(list.tail.value).toBe(2);
            expect(list.size).toBe(2);
            expect(list.head.next.value).toBe(2);

            list.append(3);
            expect(toArray(list)).toEqual([1, 2, 3]);
            expect(list.size).toBe(3);
        });

        test('prepend should add nodes at the start and update head, tail, size', () => {
            const list = new LinkedList();
            list.prepend(10);
            expect(list.head.value).toBe(10);
            expect(list.tail.value).toBe(10);
            expect(list.size).toBe(1);

            list.prepend(5);
            expect(list.head.value).toBe(5);
            expect(list.tail.value).toBe(10);
            expect(list.size).toBe(2);
            expect(toArray(list)).toEqual([5, 10]);

            list.prepend(1);
            expect(toArray(list)).toEqual([1, 5, 10]);
            expect(list.size).toBe(3);
        });

        test('search should find existing values and return false for missing ones', () => {
            const list = new LinkedList();
            [1, 2, 3, 4].forEach((v) => list.append(v));
            expect(list.search(1)).toBe(true);
            expect(list.search(3)).toBe(true);
            expect(list.search(4)).toBe(true);
            expect(list.search(999)).toBe(false);
            expect(list.search('test')).toBe(false);
        });

        test('delete on empty list should do nothing', () => {
            const list = new LinkedList();
            expect(list.size).toBe(0);
            expect(() => list.delete(1)).not.toThrow();
            expect(list.size).toBe(0);
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
        });

        test('delete should remove head correctly', () => {
            const list = new LinkedList();
            [1, 2, 3].forEach((v) => list.append(v));
            list.delete(1); // delete head
            expect(list.size).toBe(2);
            expect(list.search(1)).toBe(false);
            expect(list.head.value).toBe(2);
            expect(toArray(list)).toEqual([2, 3]);
        });

        test('delete should remove a middle node correctly', () => {
            const list = new LinkedList();
            [1, 2, 3, 4].forEach((v) => list.append(v));
            list.delete(3);
            expect(list.size).toBe(3);
            expect(list.search(3)).toBe(false);
            expect(toArray(list)).toEqual([1, 2, 4]);
        });

        test('delete should remove tail node (value no longer searchable and last.next is null)', () => {
            const list = new LinkedList();
            [1, 2, 3].forEach((v) => list.append(v));
            list.delete(3);
            expect(list.size).toBe(2);
            expect(list.search(3)).toBe(false);
            expect(list.tail.value).toBe(2);
            let cur = list.head;
            while (cur && cur.next) cur = cur.next;
            expect(cur.next).toBeNull();
            expect(toArray(list)).toEqual([1, 2]);
        });

    test('print should return "null" for empty list', () => {
    const list = new LinkedList();
    expect(list.print()).toBe('null');
})


    });
