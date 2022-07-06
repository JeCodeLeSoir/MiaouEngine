import { Component } from "./Components/Component";
import { DataGameObject } from "./data/DataGameObject";
import { Scene } from "./Scene";
import { Transform } from "./Transform";
import { List } from "./utils/List";

export class GameObject extends DataGameObject {

    constructor(name: string = "GameObject") {
        super();
        this.transform = new Transform();
        this.components = new List<Component>();
    }

    public AddComponent(component: Component): void {
        this.components.Add(component);
    }

    public RemoveComponent(component: Component): void {
        this.components.Remove(component);
    }

    public GetComponent<T>(ctor: { new(): T }): T {
        console.log('GetComponent', this.components)
        this.components.forEach((component: T | any) => {
            console.log(component, ctor, component instanceof ctor)

            if (component instanceof ctor) {
                return component as T;
            }
        });
        return null as any;
    }

}