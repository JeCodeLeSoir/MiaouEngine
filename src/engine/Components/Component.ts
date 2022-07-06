import { DataGameObject } from "../data/DataGameObject";
import { GameObject } from "../GameObject";
import { IComponent } from "./IComponent";
import * as THREE from '@three';

export class Component extends IComponent {

    public _object: any;

    public gameObject: GameObject | null = null;
    public componentType: string = "component";

    constructor() {
        super();
    }

    public async ctor(dataGameObject: DataGameObject) {
        this.gameObject = dataGameObject as GameObject;
    }

    public async NewIstance(dataGameObject: DataGameObject, componentType: string = "any"): Promise<IComponent> {
        this.componentType = componentType;
        let component: IComponent;
        let SComponent: any = await import("./" + this.componentType + ".js");
        component = Object.assign(new SComponent.default(), this)
        return component;
    }

    public ctor_Awake() {

    }

    public ctor_Start() {

    }

    public ctor_Update() {

        if (!this._object)
            return;

        let position: THREE.Vector3 = this.gameObject?.transform.position;
        if (position !== this._object.position) {
            this._object.position.set(position.x, position.y, position.z);
        }

        let rotation: THREE.Quaternion = this.gameObject?.transform.rotation;
        if (rotation !== this._object.rotation) {
            this._object.rotation.set(rotation.x, rotation.y, rotation.z);
        }

        let scale: THREE.Vector3 = this.gameObject?.transform.scale;
        if (scale !== this._object.scale) {
            this._object.scale.set(scale.x, scale.y, scale.z);
        }

    }

    isScript(): boolean {
        return false;
        //return typeof(this) ==  typeof(ComponentScript);
    }
}