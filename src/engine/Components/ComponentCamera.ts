import { Component } from "./Component";
import * as THREE from '@three';

export default class ComponentCamera extends Component {

    constructor() {
        super();
    }

    public ctor_Awake() {
        super.ctor_Awake();

        this._object = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

        let position: THREE.Vector3 = this.gameObject?.transform.position;
        let rotation: THREE.Quaternion = this.gameObject?.transform.rotation;

        this._object.position.set(position.x, position.y, position.z);
        this._object.rotation.set(rotation.x, rotation.y, rotation.z);

        this.gameObject?.scene.SetCamera(this);
        this.gameObject?.scene.scene.add(this._object);
    }

    public ctor_Start() {
        super.ctor_Start();
    }

    public ctor_Update() {
        super.ctor_Update();
    }

    public isScript(): boolean {
        return false;
    }
}