import {  Component  } from './Component.js';
import * as THREE from 'https://jecodelesoir.github.io/MiaouEngine/Build/three/three.module.js';
export default class ComponentLight extends Component {
    constructor() {
        super();
    }
    ctor_Awake() {
        super.ctor_Awake();
        this._object = new THREE.Group();
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        hemiLight.position.set(0, 20, 0);
        this._object.add(hemiLight);
        const dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(3, 10, 10);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 2;
        dirLight.shadow.camera.bottom = -2;
        dirLight.shadow.camera.left = -2;
        dirLight.shadow.camera.right = 2;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 40;
        this._object.add(dirLight);
        this.gameObject?.scene.scene.add(this._object);
        let position = this.gameObject?.transform.position;
        let rotation = this.gameObject?.transform.rotation;
        this._object.position.set(position.x, position.y, position.z);
        this._object.rotation.set(rotation.x, rotation.y, rotation.z);
    }
    ctor_Update() {
        super.ctor_Update();
    }
    isScript() {
        return false;
    }
}