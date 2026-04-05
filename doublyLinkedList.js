class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    // Time O1
    append(value) {
        let newNode = Node(value);
        if (!this.head) {
            this.tail = newNode;
            this.head = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.size++;
    }
    // Time o1
    prepend(value) {
        let newNode = Node(value);
        if (!this.head) {
            this.tail = newNode;
            this.head = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }
    // time On
    delete(value) {
        if (!this.head) {
            return;
        }
        let current = this.head;
        while (current && current.value !== value) {
            current = current.next;
        }
        if (!current) {
            return;
        }
        if (current == this.head) {
            this.head = current.next;
            if (this.head) { this.head.prev = null; }
        } else if (current == this.tail) {
            this.tail = current.prev;
            this.tail.next = null;
        } else {
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
        this.size--;
    }
    // Time On
    print() {
        let retVal = '';
        let current = this.head;
        while (current != null) {
            retVal += current.value + '->';
            current = current.next;
        }

        return retVal + 'null';
    }
    // Time On
    printBackwards() {
        let retVal = '';
        let current = this.tail;
        while (current != null) {
            retVal += current.value + '<-';
            current = current.prev;
        }
        return retVal + 'null';
    }
}