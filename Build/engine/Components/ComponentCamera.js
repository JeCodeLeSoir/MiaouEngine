import {  Component  } from './Component.js';
import * as THREE from 'http://localhost/Meta/Build/three/three.module.js';
export default class ComponentCamera extends Component {
    constructor() {
        super();
    }
    ctor_Awake() {
        super.ctor_Awake();
        this._object = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        let position = this.gameObject?.transform.position;
        let rotation = this.gameObject?.transform.rotation;
        this._object.position.set(position.x, position.y, position.z);
        this._object.rotation.set(rotation.x, rotation.y, rotation.z);
        this.gameObject?.scene.SetCamera(this);
        this.gameObject?.scene.scene.add(this._object);
    }
    ctor_Start() {
        super.ctor_Start();
    }
    ctor_Update() {
        super.ctor_Update();
    }
    isScript() {
        return false;
    }
}