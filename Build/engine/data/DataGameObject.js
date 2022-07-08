import * as THREE from 'http://localhost/Meta/Build/three/three.module.js';
import {  Component  } from '../Components/Component.js';
import {  Transform  } from '../Transform.js';
import {  List  } from '../utils/List.js';
export class DataGameObject {
    name;
    transform;
    components;
    scene;
    constructor() {
        console.log(THREE);
        this.name = "AnyGameObject";
        this.transform = new Transform();
        this.components = new List();
    }
    async ctor(scene) {
        this.scene = scene;
        await this.components.forEach(async (component) => {
            console.log("=================", component);
            component.ctor(this);
            await component.ctor_Awake();
        });
    }
    async ctorComponents() {
        try {
            for (let i = 0; i < this.components.length; i++) {
                let component = List.Get(this.components, i, Component);
                let _Icomp = await component.NewIstance(this, component.componentType);
                if (_Icomp === undefined) {
                    throw "One component is null !";
                }
                this.components[i] = _Icomp;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    ctor_Start() {
        this.components.forEach((component) => {
            component.ctor_Start();
        });
    }
    ctor_Update() {
        this.transform.ctor_Update();
        this.components.forEach((component) => {
            component.ctor_Update();
        });
    }
}