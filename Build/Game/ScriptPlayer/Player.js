import Input from '../../engine/utils/Input.js';
import MonoBehaviour from '../../engine/Components/MonoBehaviour.js';
import * as THREE from 'http://localhost/Meta/Build/three/three.module.js';
import Time from '../../engine/utils/Time.js';
import PointerMain from '../../PointerMain.js';
import MathF from '../../engine/utils/MathF.js';
export default class Player extends MonoBehaviour {
    speed = 2;
    Camera;
    offsetCameraPosition = new THREE.Vector3(0, 1, 0);
    offsetCameraRotation = new THREE.Euler(0, 0, 0);
    xRotation = 0;
    Awake() {
        this.gameObject?.transform.position.set(0, 0, 0);
    }
    Start() {
        console.log("Player Start");
        this.Camera = PointerMain.Instance.getCamera();
    }
    Update() {
        let z = -Input.getAxis("Horizontal");
        let x = -Input.getAxis("Vertical");
        let mx = Input.getMouseValue("X");
        let mouseY = Input.getMouseValue("Y");
        let position = this.gameObject?.transform.position;
        position.x += x * this.speed * Time.deltaTime;
        position.z += z * this.speed * Time.deltaTime;
        this.Camera.gameObject?.transform.position.set(position.x, position.y, position.z);
        this.Camera.gameObject?.transform.position.add(this.offsetCameraPosition);
        this.xRotation -= mouseY;
        this.xRotation = MathF.clamp(this.xRotation, -90, 90);
        let localRotation = this.Camera.gameObject?.transform.localRotation;
        localRotation = new THREE.Euler(this.xRotation, 0, 0, "XYZ");
    }
    LateUpdate() {
    }
    FixedUpdate() {
    }
    PhysicsUpdate() {
    }
}