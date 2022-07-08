import * as THREE from 'http://localhost/Meta/Build/three/three.module.js';
export class Vector3 extends THREE.Vector3 {
    static forward() {
        return new THREE.Vector3(0, 0, 1);
    }
    static up() {
        return new THREE.Vector3(0, 1, 0);
    }
    static right() {
        return new THREE.Vector3(1, 0, 0);
    }
    static left() {
        return new THREE.Vector3(-1, 0, 0);
    }
    static down() {
        return new THREE.Vector3(0, -1, 0);
    }
    static back() {
        return new THREE.Vector3(0, 0, -1);
    }
}