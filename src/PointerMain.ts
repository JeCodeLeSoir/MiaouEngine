import * as THREE from "@three";
import { DataPointerMain } from "./engine/data/DataPointerMain";
import { Scene } from "./engine/Scene";
import { GameObject } from "./engine/GameObject";
import { Component } from "./engine/Components/Component";

import AmmoLib from "@ammo";
import Input from "./engine/utils/Input";
import Time from "./engine/utils/Time";
import LoaderRegister from "./engine/utils/LoaderRegister";
import ComponentCamera from "./engine/Components/ComponentCamera";
import Cursor from "./engine/utils/Cursor";
let Ammo;

export default class PointerMain extends DataPointerMain {
  public static Instance: PointerMain;

  htmlLoading: HTMLInputElement | any;
  loadingManager: THREE.LoadingManager;

  gravityConstant: number = 7.8;

  private clock: THREE.Clock = new THREE.Clock();
  private delta: number = 0;
  // 30 fps
  private interval: number = 1 / 5;

  MaxFps: number = 0;

  renderer: THREE.WebGLRenderer;
  container: HTMLInputElement | any;

  physicsWorld: any;

  scene: Scene | any;

  getCamera(): ComponentCamera {
    return this.getScene().GetCamera();
  }

  getScene(): Scene {
    return this.scene;
  }

  private isload: boolean = false;

  IsLoad(): boolean {
    return this.isload;
  }

  SetLoad(value: boolean) {
    this.isload = value;
  }

  constructor() {
    super();
    PointerMain.Instance = this;
  }

  async OnLoad() { }

  async Run(container: HTMLInputElement) {
    this.interval = 1 / this.MaxFps;
    this.loadingManager = new THREE.LoadingManager();

    let loader = new THREE.FileLoader(this.loadingManager);

    loader.load("htmls/loading.html", (text) => {
      console.log(text);
      let html = document.createRange().createContextualFragment(text)
      container.parentElement?.appendChild(html);
      this.htmlLoading = document.getElementById("loading") as HTMLInputElement;
    })


    this.loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
      let text: any = document.getElementById("text-loading")
      text.innerHTML = `Started loading file: ${url} ${itemsLoaded}/${itemsTotal}`;
    };

    this.loadingManager.onLoad = function () {
      console.log('Loading complete!');
      let text: any = document.getElementById("text-loading")
      text.innerHTML = `Loading complete!`;
    };

    this.loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {

      let progress: any = document.getElementById("progress-loading")
      let text: any = document.getElementById("text-loading")

      progress.value = itemsLoaded / itemsTotal * 100;
      text.innerHTML = `Loading file: ${url} ${itemsLoaded}/${itemsTotal}`;
    };

    this.loadingManager.onError = function (url) {

      console.log('There was an error loading ' + url);

    };

    new Input(document.body);
    new Cursor(document.body);

    await AmmoLib().then(async (re) => {
      Ammo = re;

      let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
      let dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
      let broadphase = new Ammo.btDbvtBroadphase();
      let solver = new Ammo.btSequentialImpulseConstraintSolver();

      this.physicsWorld = new Ammo.btDiscreteDynamicsWorld(
        dispatcher,
        broadphase,
        solver,
        collisionConfiguration
      );

      this.physicsWorld.setGravity(
        new Ammo.btVector3(0, -this.gravityConstant, 0)
      );

      console.log(JSON.stringify(new THREE.Vector3()));
      this.container = container;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.shadowMap.enabled = true;

      this.container.appendChild(this.renderer.domElement);

      this.scene = await Scene.Load(this.PathScenes[this.DefaultScene], Scene);

      Object.values(LoaderRegister.loaders).forEach((callback: Function) => {
        callback(this.loadingManager);
      });

      this.backIsNotLoad();
    });



  }

  backIsNotLoad() {
    console.log("backIsNotLoad");

    if (Object.values(LoaderRegister.loaders).length == 0) {

      console.log(this.htmlLoading);
      this.container.parentElement?.removeChild(this.htmlLoading);

      PointerMain.Instance.SetLoad(true);
      PointerMain.Instance.OnLoad();
      console.log("== finish ==")

      let scene: Scene = this.getScene();
      let camera: any = this.getCamera()._object as THREE.Camera;

      if (camera && scene) {
        window.addEventListener('click', function () {
          Cursor.lock();
        });

        scene.gameObjects.forEach((gameObject: GameObject) => {
          console.log(gameObject)

          gameObject.ctor_Start();
        });
      }
    }

    if (this.IsLoad()) {
      window.addEventListener("resize", () => this.onWindowResize());
      this.ctor_Update();
    } else {
      requestAnimationFrame(() => this.backIsNotLoad());
    }
  }

  private ctor_Update() {
    requestAnimationFrame(() => this.ctor_Update());

    const deltaTime: number = this.clock.getDelta();

    Time.deltaTime = deltaTime;

    this.delta += deltaTime;

    if (this.delta > this.interval) {

      Input.Update();

      let scene: Scene = this.getScene();
      let camera: any = this.getCamera()._object as THREE.Camera;

      if (camera && scene) {

        //Update GameObject

        scene.gameObjects.forEach((gameObject: GameObject) => {
          gameObject.ctor_Update();
        });

        //this.physicsWorld.stepSimulation(deltaTime, 10);

        this.renderer.render(scene.scene, camera);
      }

      this.delta = this.delta % this.interval;
    }
  }

  private onWindowResize() {

    let camera: any = this.getCamera()._object as THREE.Camera;

    if (camera) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
