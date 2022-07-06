import {  Type  } from './utils/Type.js';
export class DataJson {
    Write() {
        return JSON.stringify(this);
    }
    static async Load(url, ctor) {
        let response = await fetch(url);
        let json = await response.json();
        let c = Type.Cast(new ctor(), json);
        await c["OnLoad"]();
        return c;
    }
}