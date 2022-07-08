import * as THREE from '@three';

export class Vector3 extends THREE.Vector3 {

    static forward(): THREE.Vector3 {
        return new THREE.Vector3(0, 0, 1);
    }
    static up(): THREE.Vector3 {
        return new THREE.Vector3(0, 1, 0);
    }
    static right(): THREE.Vector3 {
        return new THREE.Vector3(1, 0, 0);
    }
    static left(): THREE.Vector3 {
        return new THREE.Vector3(-1, 0, 0);
    }
    static down(): THREE.Vector3 {
        return new THREE.Vector3(0, -1, 0);
    }
    static back(): THREE.Vector3 {
        return new THREE.Vector3(0, 0, -1);
    }
}