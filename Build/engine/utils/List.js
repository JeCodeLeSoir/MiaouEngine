import {  Type  } from './Type.js';
export class List extends Array {
    Add(item) {
        this.push(item);
    }
    static Get(values, index, ctor) {
        return Type.Cast(new ctor(), values[index]);
    }
    Set(index, value, ctor) {
        this[index] = Type.Cast(new ctor(), value);
    }
    AddRange(item) {
        this.push(...item);
    }
    Remove(item) {
        this.splice(this.indexOf(item), 1);
    }
    Contains(item) {
        return this.indexOf(item) != -1;
    }
}