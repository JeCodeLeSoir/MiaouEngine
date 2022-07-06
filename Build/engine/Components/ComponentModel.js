import {  GLTFLoader  } from 'http://localhost/Meta/Build/three/jsm/loaders/GLTFLoader.js';
import {  Component  } from './Component.js';
import LoaderRegister from '../utils/LoaderRegister.js';
export default class ComponentModel extends Component {
    pathModel = "";
    constructor() {
        super();
    }
    async LoadModel(loader, path) {
        return new Promise((resolve, reject) => {
            loader.load(path, (gltf) => {
                resolve(gltf);
            });
        });
    }
    async ctor_Awake() {
        await super.ctor_Awake();
        LoaderRegister.register(this.GetUuid(), async ($) => {
            const loader = new GLTFLoader($);
            let gltf = await this.LoadModel(loader, this.pathModel);
            this._object = gltf.scene;
            this._object.traverse(function (object) {
                if (object.isMesh)
                    object.castShadow = true;
            });
            let position = this.gameObject?.transform.position;
            let rotation = this.gameObject?.transform.rotation;
            let scale = this.gameObject?.transform.scale;
            this._object.position.set(position.x, position.y, position.z);
            this._object.rotation.set(rotation.x, rotation.y, rotation.z);
            this._object.scale.set(scale.x, scale.y, scale.z);
            this.gameObject?.scene.scene.add(this._object);
            console.log("== model load finish ==");
            LoaderRegister.unregister(this.GetUuid());
        });
        console.log("== model register ==");
    }
    ctor_Update() {
        super.ctor_Update();
    }
    isScript() {
        return false;
    }
}