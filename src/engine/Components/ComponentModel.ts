import * as THREE from "@three";
import { GLTFLoader } from "@Build/GLTFLoader";
import { Component } from "./Component";
import LoaderRegister from "../utils/LoaderRegister";

export default class ComponentModel extends Component {

  public pathModel: string = "";

  constructor() {
    super();
  }

  public async LoadModel(loader: any, path: string) {
    return new Promise((resolve, reject) => {
      loader.load(path, (gltf) => {
        resolve(gltf);
      });
    });
  }

  public async ctor_Awake() {
    await super.ctor_Awake();

    //get Hash Code of this

    LoaderRegister.register(this.GetUuid(), async ($) => {

      const loader = new GLTFLoader($);

      let gltf: any = await this.LoadModel(loader, this.pathModel);

      this._object = gltf.scene;

      this._object.traverse(function (object) {
        if (object.isMesh) object.castShadow = true;
      });

      let position: THREE.Vector3 = this.gameObject?.transform.position;
      let rotation: THREE.Quaternion = this.gameObject?.transform.rotation;
      let scale: THREE.Vector3 = this.gameObject?.transform.scale;

      this._object.position.set(position.x, position.y, position.z);
      this._object.rotation.set(rotation.x, rotation.y, rotation.z);
      this._object.scale.set(scale.x, scale.y, scale.z);

      this.gameObject?.scene.scene.add(this._object);

      console.log("== model load finish ==")
      LoaderRegister.unregister(this.GetUuid());
    })

    console.log("== model register ==")
  }

  public ctor_Update() {
    super.ctor_Update();
  }

  public isScript(): boolean {
    return false;
  }
}
