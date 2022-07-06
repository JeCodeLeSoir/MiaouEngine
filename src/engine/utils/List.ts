import { Type } from "./Type";

export class List<T> extends Array {

    Add(item: T) {
        this.push(item);
    }

    public static Get<T>(values : any[] , index: number, ctor: { new(): T }) : T {
       return Type.Cast<T, any>(new ctor(), values[index]);
    }

    Set<T>(index: number, value : any, ctor: { new(): T }) {
       this[index] = Type.Cast<T, any>(new ctor(), value);
    }

    AddRange(item: T[]) {
        this.push(...item);
    }

    Remove(item: T) {
        this.splice(this.indexOf(item), 1);
    }

    Contains(item: T) {
        return this.indexOf(item) != -1;
    }
}