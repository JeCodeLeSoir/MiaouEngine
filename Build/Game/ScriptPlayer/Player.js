import Input from '../../engine/utils/Input.js';
import MonoBehaviour from '../../engine/Components/MonoBehaviour.js';
import * as THREE from 'http://localhost/Meta/Build/three/three.module.js';
import Time from '../../engine/utils/Time.js';
import PointerMain from '../../PointerMain.js';
const _PI_2 = Math.PI / 2;
export default class Player extends MonoBehaviour {
    speed = 200;
    Camera;
    offsetCameraPosition = new THREE.Vector3(0, 1, 0);
    offsetCameraRotation = new THREE.Euler(0, 0, 0);
    rotation = 0;
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
        let my = Input.getMouseValue("Y");
        let position = this.gameObject?.transform.position;
        let forward = this.gameObject?.transform.GetForward();
        position = forward.multiplyScalar(z * this.speed * Time.deltaTime);
        console.log(position);
        this.Camera.gameObject?.transform.position.set(position.x, position.y, position.z);
        this.Camera.gameObject?.transform.position.add(this.offsetCameraPosition);
        let rotationCamera = this.Camera.gameObject?.transform.rotation;
        rotationCamera.y -= mx * 1 * Time.deltaTime;
        this.Camera.gameObject?.transform.rotation.set(rotationCamera.x, rotationCamera.y, rotationCamera.z);
    }
    LateUpdate() {
    }
    FixedUpdate() {
    }
    PhysicsUpdate() {
    }
}