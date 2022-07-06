import * as THREE from "@three";
import PointerMain from "../PointerMain";
import ComponentCamera from "./Components/ComponentCamera";

import { DataScene } from "./data/DataScene";
import { GameObject } from "./GameObject";
import { List } from "./utils/List";

export class Scene extends DataScene {


  private camera: ComponentCamera | any = null;

  public GetScene() {
    return this.scene;
  }

  public GetCamera(): ComponentCamera {
    return this.camera;
  }

  public SetCamera(camera: ComponentCamera) {
    this.camera = camera;
  }

  Add(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
  }

  Remove(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
  }

  constructor(
    name: string = "",
    gameObjects: List<GameObject> = new List<GameObject>()
  ) {
    super(name, gameObjects);


  }

  async OnLoad(): Promise<any> {
    await super.OnLoad();
  }
}
