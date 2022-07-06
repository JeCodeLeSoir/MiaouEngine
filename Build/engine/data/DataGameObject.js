import {  Component  } from '../Components/Component.js';
import {  Transform  } from '../Transform.js';
import {  List  } from '../utils/List.js';
export class DataGameObject {
    name;
    transform;
    components;
    scene;
    constructor() {
        this.name = "AnyGameObject";
        this.transform = new Transform();
        this.components = new List();
    }
    async ctor(scene) {
        this.scene = scene;
        await this.components.forEach(async (component) => {
            component.ctor(this);
            await component.ctor_Awake();
        });
    }
    async ctorComponents() {
        for (let i = 0; i < this.components.length; i++) {
            let component = List.Get(this.components, i, Component);
            let _Icomp = await component.NewIstance(this, component.componentType);
            if (_Icomp === undefined) {
                throw "One component is null !";
            }
            this.components[i] = _Icomp;
        }
    }
    ctor_Update() {
        console.log(this.transform);
        this.transform.ctor_Update();
        this.components.forEach((component) => {
            component.ctor_Update();
        });
    }
}