import * as THREE from 'http://localhost/Meta/Build/three/three.module.js';
import {  DataPointerMain  } from './engine/data/DataPointerMain.js';
import {  Scene  } from './engine/Scene.js';
import AmmoLib from 'http://localhost/Meta/Build/ammo/ammo.js';
import Input from './engine/utils/Input.js';
import Time from './engine/utils/Time.js';
import LoaderRegister from './engine/utils/LoaderRegister.js';
import Cursor from './engine/utils/Cursor.js';
let Ammo;
export default class PointerMain extends DataPointerMain {
    static Instance;
    htmlLoading;
    loadingManager;
    gravityConstant = 7.8;
    clock = new THREE.Clock();
    delta = 0;
    interval = 1 / 5;
    MaxFps = 0;
    renderer;
    container;
    physicsWorld;
    scene;
    getCamera() {
        return this.getScene().GetCamera();
    }
    getScene() {
        return this.scene;
    }
    isload = false;
    IsLoad() {
        return this.isload;
    }
    SetLoad(value) {
        this.isload = value;
    }
    constructor() {
        super();
        PointerMain.Instance = this;
    }
    async OnLoad() { }
    async Run(container) {
        this.interval = 1 / this.MaxFps;
        this.loadingManager = new THREE.LoadingManager();
        let loader = new THREE.FileLoader(this.loadingManager);
        loader.load("htmls/loading.html", (text) => {
            console.log(text);
            let html = document.createRange().createContextualFragment(text);
            container.parentElement?.appendChild(html);
            this.htmlLoading = document.getElementById("loading");
        });
        this.loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
            let text = document.getElementById("text-loading");
            text.innerHTML = `Started loading file: ${url} ${itemsLoaded}/${itemsTotal}`;
        };
        this.loadingManager.onLoad = function () {
            console.log('Loading complete!');
            let text = document.getElementById("text-loading");
            text.innerHTML = `Loading complete!`;
        };
        this.loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
            let progress = document.getElementById("progress-loading");
            let text = document.getElementById("text-loading");
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
            this.physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
            this.physicsWorld.setGravity(new Ammo.btVector3(0, -this.gravityConstant, 0));
            console.log(JSON.stringify(new THREE.Vector3()));
            this.container = container;
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.outputEncoding = THREE.sRGBEncoding;
            this.renderer.shadowMap.enabled = true;
            this.container.appendChild(this.renderer.domElement);
            this.scene = await Scene.Load(this.PathScenes[this.DefaultScene], Scene);
            Object.values(LoaderRegister.loaders).forEach((callback) => {
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
            console.log("== finish ==");
            let scene = this.getScene();
            let camera = this.getCamera()._object;
            if (camera && scene) {
                window.addEventListener('click', function () {
                    Cursor.lock();
                });
                scene.gameObjects.forEach((gameObject) => {
                    console.log(gameObject);
                    gameObject.ctor_Start();
                });
            }
        }
        if (this.IsLoad()) {
            window.addEventListener("resize", () => this.onWindowResize());
            this.ctor_Update();
        }
        else {
            requestAnimationFrame(() => this.backIsNotLoad());
        }
    }
    ctor_Update() {
        requestAnimationFrame(() => this.ctor_Update());
        const deltaTime = this.clock.getDelta();
        Time.deltaTime = deltaTime;
        this.delta += deltaTime;
        if (this.delta > this.interval) {
            Input.Update();
            let scene = this.getScene();
            let camera = this.getCamera()._object;
            if (camera && scene) {
                scene.gameObjects.forEach((gameObject) => {
                    gameObject.ctor_Update();
                });
                this.renderer.render(scene.scene, camera);
            }
            this.delta = this.delta % this.interval;
        }
    }
    onWindowResize() {
        let camera = this.getCamera()._object;
        if (camera) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}