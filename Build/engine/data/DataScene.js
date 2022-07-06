import * as THREE from 'http://localhost/Meta/Build/three/three.module.js';
import {  GameObject  } from '../GameObject.js';
import {  List  } from '../utils/List.js';
import {  DataJson  } from '../DataJson.js';
import {  Transform  } from '../Transform.js';
export class DataScene extends DataJson {
    scene;
    name;
    gameObjects;
    background;
    fog;
    skyboxGeo;
    skybox;
    constructor(name = "null", gameObjects = new List()) {
        super();
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xa0a0a0);
        this.name = name;
        this.gameObjects = gameObjects;
    }
    async OnLoad() {
        return new Promise(async (resolve, reject) => {
            const gridHelper = new THREE.GridHelper(1000, 10);
            this.scene.add(gridHelper);
            this.background = Object.assign(new THREE.Color(), this.background);
            this.fog = Object.assign(new THREE.Fog(), this.fog);
            this.scene.background = new THREE.Color(this.background);
            let skybox_keys = Object.keys(this.skybox.textures);
            let skyboxMaterials = [];
            for (let i = 0; i < skybox_keys.length; i++) {
                let key = skybox_keys[i];
                let value = this.skybox.textures[key];
                console.log(key, value);
                let side = 0;
                let texture = new THREE.TextureLoader().load(value);
                let material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
                skyboxMaterials.push(material);
            }
            this.skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
            this.skybox = new THREE.Mesh(this.skyboxGeo, skyboxMaterials);
            this.skybox.position.set(0, 0, 0);
            console.log(this.skybox);
            this.scene.add(this.skybox);
            for (let i = 0; i < this.gameObjects.length; i++) {
                let gameObject = List.Get(this.gameObjects, i, GameObject);
                let position = gameObject.transform.position;
                let rotation = gameObject.transform.rotation;
                let scale = gameObject.transform.scale;
                let localPosition = gameObject.transform.localPosition;
                let localRotation = gameObject.transform.localRotation;
                let localScale = gameObject.transform.localScale;
                gameObject.transform.position = Object.assign(new THREE.Vector3(), position);
                gameObject.transform.rotation = Object.assign(new THREE.Quaternion(), rotation);
                gameObject.transform.scale = Object.assign(new THREE.Vector3(), scale);
                gameObject.transform.localPosition = Object.assign(new THREE.Vector3(), localPosition);
                gameObject.transform.localRotation = Object.assign(new THREE.Quaternion(), localRotation);
                gameObject.transform.localScale = Object.assign(new THREE.Vector3(), localScale);
                gameObject.transform = Object.assign(new Transform(), gameObject.transform);
                await gameObject.ctorComponents();
                this.gameObjects[i] = gameObject;
                await this.gameObjects[i].ctor(this);
            }
            resolve(this);
            console.log(this.gameObjects);
        });
    }
}