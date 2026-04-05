class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    //insert at end time O1
    append(value) {
        const newNode = new Node(value);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    }
    // time O1
    prepend(value) {
        const newNode = new Node(value);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.size++;
    }
    //delete time On
    delete(value) {
        if (!this.head) {
            return null;
        }
        if (this.head.value === value) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        const current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }
        if (current.next) {
            current.next = current.next.next;
            this.size--;
        }
    }
// time On
    search(value) {

        let current = this.head;

        while (current) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }

        return false;

    }
    // print -> time On
    print() {
        let current = this.head;
        let retVal = '';
        while (current) {
            res += current.value + '->'
            current = current.next;
        }
        console.log(retVal + 'null');
    }
}