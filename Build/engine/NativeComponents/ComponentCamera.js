import {  Component  } from '../Components/Component.js';
import * as THREE from 'http://localhost/Meta/Build/three/three.module.js';
class ComponentCamera extends Component {
    camera;
    constructor() {
        super();
    }
    ctor_Awake() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
        this.gameObject?.scene.scene.add(this.camera);
        console.log("camera");
    }
    ctor_Update() {
        let position = this.gameObject?.transform.position;
        let rotation = this.gameObject?.transform.rotation;
        this.camera.position = position;
        this.camera.rotation = rotation;
    }
    isScript() {
        return false;
    }
}