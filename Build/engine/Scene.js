import {  DataScene  } from './data/DataScene.js';
import {  List  } from './utils/List.js';
export class Scene extends DataScene {
    camera = null;
    GetScene() {
        return this.scene;
    }
    GetCamera() {
        return this.camera;
    }
    SetCamera(camera) {
        this.camera = camera;
    }
    Add(gameObject) {
        this.gameObjects.push(gameObject);
    }
    Remove(gameObject) {
        this.gameObjects.push(gameObject);
    }
    constructor(name = "", gameObjects = new List()) {
        super(name, gameObjects);
    }
    async OnLoad() {
        await super.OnLoad();
    }
}