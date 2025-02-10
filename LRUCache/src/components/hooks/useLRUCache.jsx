// lru cache has limited size
// design the custom hook here for lrucache
// when we put something into the lru caches,  if data is already
// present in the linked list then take that data and put in the front of the linked list
// otherwise remove the least recently used data put the new element
// in front and shift the remaining data
import { useRef } from "react";
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = {};
    this.head = null;
    this.tail = null;
  }

  get(key) {
    // if key is present
    if (this.cache[key]) {
      this.moveElementToFront(key);
      return this.cache[key].value;
    }
    return null; // return null if key is not present
  }
  put(key, value) {
    // before putting any value check whether its present in cache or not
    if (this.cache[key]) {
      // if present then move that element to the front
      this.cache[key].value = value;
      //move to front
      this.moveElementToFront(key);
    } else {
      // if capacity is full remove the least recently used item
      if (Object.keys(this.cache).length === this.capacity) {
        this.removeLastElement();
      }
      this.addElementToFront(key, value);
      // remove least recently used item from the cache and add the new element at front
    }
  }

  addElementToFront(key, value) {
    const newNode = {
      key,
      value,
      next: null,
    };
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    // store the newNode object in cache object as well
    this.cache[key] = newNode;
  }

  moveElementToFront(key) {
    const current = this.cache[key];
    // if the element is already present at the front of the cache we don't need to move it again

    if (current === this.head) return;
    // otherwise remove the current node from its position and then move to front of the linked list
    let prev = null;
    let node = this.head;
    while (node && node.key != key) {
      prev = node;
      node = node.next;
    }
    // if node doesn't exist then return
    if (!node) return;

    // if node exists at the end of the linked list, remove it from the linked list and update the tail to prev
    if (node == this.tail) {
      this.tail = prev;
    }

    // if node is find in between of the linkedlist then update the next link of the previous node to the node next to the current node

    if (prev) {
      prev.next = node.next;
    }
    // add the node to the front
    node.next = this.head;
    this.head = node;
  }

  removeLastElement() {
    // if linked list is empty
    if (!this.head) return;
    const lastKey = this.tail.key;
    delete this.cache[lastKey];

    // if only one element in the linked list
    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;
      while (current.next !== this.tail) {
        current = current.next;
      }
      current.next = null;
      this.tail = current;
    }
  }
}

const useLRUCache = (capacity) => {
  // with every rerender of the app the LRUCache() will provide
  // new instance of cache and we will not be able to store data
  //  inside the cache, to make the data persistent we use useRef
  //   useRef hook is a built-in React hook that provides a way to persist values between renders without causing a re-render when the value changes.
  //   Key Points about useRef
  //   Persisting Values:

  //   useRef is used to hold a mutable object that persists for the entire lifecycle of the component. This means that the value held by the useRef object does not get reset or lost between re-renders.
  //   No Re-render:

  //   Updating a useRef value does not trigger a re-render of the component. This is in contrast to updating a state with useState, which triggers a re-render.
  //   Accessing DOM Elements:

  //   useRef is commonly used to access DOM elements directly. This is useful for cases where you need to interact with a DOM element imperatively, such as focusing an input or scrolling to a specific element.
  //   Mutable Object:

  //   The useRef hook returns a mutable object with a current property. This current property can be updated directly without causing a re-render.
  const cacheRef = useRef(new LRUCache(capacity));
  console.log(cacheRef.current);
  return {
    get: (key) => cacheRef.current.get(key),
    put: (key, value) => cacheRef.current.put(key, value),
  };
};

export default useLRUCache;
