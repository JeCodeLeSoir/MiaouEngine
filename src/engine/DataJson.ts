import { Type } from "./utils/Type";


export abstract class DataJson {

    Write() {
       return JSON.stringify(this);
    }

    public abstract OnLoad();

    static async Load<T>(url: string, ctor: { new(): T }): Promise<T> {
        let response = await fetch(url);
        let json = await response.json();
        let c: T = Type.Cast<T, DataJson>(new ctor(), json);
        await c["OnLoad"]();
        return c;
    }
}