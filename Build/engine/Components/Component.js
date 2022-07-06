import {  IComponent  } from './IComponent.js';
export class Component extends IComponent {
    _object;
    gameObject = null;
    componentType = "component";
    constructor() {
        super();
    }
    async ctor(dataGameObject) {
        this.gameObject = dataGameObject;
    }
    async NewIstance(dataGameObject, componentType = "any") {
        this.componentType = componentType;
        let component;
        let SComponent = await import('./' + this.componentType + '.js');
        component = Object.assign(new SComponent.default(), this);
        return component;
    }
    ctor_Awake() {
    }
    ctor_Start() {
    }
    ctor_Update() {
        if (!this._object)
            return;
        let position = this.gameObject?.transform.position;
        if (position !== this._object.position) {
            this._object.position.set(position.x, position.y, position.z);
        }
        let rotation = this.gameObject?.transform.rotation;
        if (rotation !== this._object.rotation) {
            this._object.rotation.set(rotation.x, rotation.y, rotation.z);
        }
        let scale = this.gameObject?.transform.scale;
        if (scale !== this._object.scale) {
            this._object.scale.set(scale.x, scale.y, scale.z);
        }
    }
    isScript() {
        return false;
    }
}