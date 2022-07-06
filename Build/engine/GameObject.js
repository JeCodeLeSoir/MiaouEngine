import {  DataGameObject  } from './data/DataGameObject.js';
import {  Transform  } from './Transform.js';
import {  List  } from './utils/List.js';
export class GameObject extends DataGameObject {
    constructor(name = "GameObject") {
        super();
        this.transform = new Transform();
        this.components = new List();
    }
    AddComponent(component) {
        this.components.Add(component);
    }
    RemoveComponent(component) {
        this.components.Remove(component);
    }
    GetComponent(ctor) {
        console.log('GetComponent', this.components);
        this.components.forEach((component) => {
            console.log(component, ctor, component instanceof ctor);
            if (component instanceof ctor) {
                return component;
            }
        });
        return null;
    }
}