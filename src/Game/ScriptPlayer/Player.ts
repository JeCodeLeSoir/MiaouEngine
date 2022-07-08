import Input from "../../engine/utils/Input";
import MonoBehaviour from "../../engine/Components/MonoBehaviour";
import * as THREE from '@three';
import Time from "../../engine/utils/Time";
import ComponentCamera from "../../engine/Components/ComponentCamera";
import PointerMain from "../../PointerMain";
import { Vector3 } from "../../engine/utils/VecUtils";

const _PI_2 = Math.PI / 2;

export default class Player extends MonoBehaviour {

    speed: number = 200;

    Camera: ComponentCamera | any;

    offsetCameraPosition = new THREE.Vector3(0, 1, 0);
    offsetCameraRotation = new THREE.Euler(0, 0, 0);

    rotation: number = 0;

    public Awake() {
        this.gameObject?.transform.position.set(0, 0, 0);
    }

    public Start() {
        console.log("Player Start");
        this.Camera = PointerMain.Instance.getCamera();
    }


    public Update() {

        let z = -Input.getAxis("Horizontal");
        let x = -Input.getAxis("Vertical");

        let mx = Input.getMouseValue("X");
        let my = Input.getMouseValue("Y");

        let position: THREE.Vector3 = this.gameObject?.transform.position;

        //get forward game object
        let forward: THREE.Vector3 = this.gameObject?.transform.GetForward();
        position = forward.multiplyScalar(z * this.speed * Time.deltaTime);

        console.log(position);



        this.Camera.gameObject?.transform.position.set(position.x, position.y, position.z);
        this.Camera.gameObject?.transform.position.add(this.offsetCameraPosition);

        let rotationCamera: THREE.Quaternion = this.Camera.gameObject?.transform.rotation;

        //rotationCamera.x += my * 1 * Time.deltaTime;
        rotationCamera.y -= mx * 1 * Time.deltaTime;

        this.Camera.gameObject?.transform.rotation.set(rotationCamera.x, rotationCamera.y, rotationCamera.z);
    }

    public LateUpdate() {

    }

    public FixedUpdate() {

    }

    public PhysicsUpdate() {

    }

}