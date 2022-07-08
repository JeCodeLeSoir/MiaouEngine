import * as THREE from 'http://localhost/Meta/Build/three/three.module.js';
export class Transform {
    position;
    rotation;
    scale;
    parent;
    localPosition;
    localRotation;
    localScale;
    constructor() {
        this.position = new THREE.Vector3();
        this.rotation = new THREE.Quaternion();
        this.scale = new THREE.Vector3(1, 1, 1);
        this.localPosition = new THREE.Vector3();
        this.localRotation = new THREE.Quaternion();
    }
    ctor_Update() {
        if (this.parent) {
            this.localPosition = this.position.sub(this.parent.GetWorldPosition());
            this.localRotation = this.rotation.multiply(this.parent.GetWorldRotation().inverse());
            this.localScale = this.scale.multiply(this.parent.GetWorldScale().inverse());
        }
        if (this.parent) {
            this.position.copy(this.localPosition).applyQuaternion(this.parent.GetWorldRotation());
            this.rotation.copy(this.localRotation).multiply(this.parent.GetWorldRotation());
            this.scale.copy(this.localScale).multiply(this.parent.GetWorldScale());
        }
    }
    SetParent(parent) {
        this.parent = parent;
    }
    SetPosition(x, y, z) {
        this.position.set(x, y, z);
    }
    SetRotation(x, y, z, w) {
        this.rotation.set(x, y, z, w);
    }
    SetScale(x, y, z) {
        this.scale.set(x, y, z);
    }
    SetLocalPosition(x, y, z) {
        this.localPosition.set(x, y, z);
    }
    SetLocalRotation(x, y, z, w) {
        this.localRotation.set(x, y, z, w);
    }
    GetPosition() {
        return this.position;
    }
    GetRotation() {
        return this.rotation;
    }
    GetScale() {
        return this.scale;
    }
    GetLocalPosition() {
        return this.localPosition;
    }
    GetLocalRotation() {
        return this.localRotation;
    }
    GetWorldPosition() {
        if (this.parent) {
            return this.position.add(this.parent.GetWorldPosition());
        }
        return this.position;
    }
    GetWorldRotation() {
        if (this.parent) {
            return this.rotation.multiply(this.parent.GetWorldRotation());
        }
        return this.rotation;
    }
    GetWorldScale() {
        if (this.parent) {
            return this.scale.multiply(this.parent.GetWorldScale());
        }
        return this.scale;
    }
    GetLocalToWorldMatrix() {
        let matrix = new THREE.Matrix4();
        matrix.makeRotationFromQuaternion(this.GetWorldRotation());
        matrix.setPosition(this.GetWorldPosition());
        return matrix;
    }
    GetWorldToLocalMatrix() {
        let matrix = new THREE.Matrix4();
        matrix.makeRotationFromQuaternion(this.GetLocalRotation().inverse());
        matrix.setPosition(this.GetLocalPosition().negate());
        return matrix;
    }
    GetLocalToWorldPosition() {
        return this.GetWorldPosition().sub(this.GetWorldToLocalMatrix().getPosition());
    }
    GetWorldToLocalPosition() {
        return this.GetLocalPosition().sub(this.GetLocalToWorldMatrix().getPosition());
    }
    GetLocalToWorldRotation() {
        return this.GetWorldRotation().multiply(this.GetLocalToWorldMatrix().getRotation());
    }
    GetWorldToLocalRotation() {
        return this.GetLocalRotation().multiply(this.GetWorldToLocalMatrix().getRotation());
    }
    LookAt(target, up) {
        this.rotation.setFromRotationMatrix(new THREE.Matrix4().lookAt(this.position, target, up));
    }
    LookAtLocal(target, up) {
        this.localRotation.setFromRotationMatrix(new THREE.Matrix4().lookAt(this.localPosition, target, up));
    }
    Translate(x, y, z) {
        this.position.add(new THREE.Vector3(x, y, z));
    }
    GetForward() {
        return new THREE.Vector3(0, 0, 1).applyQuaternion(this.rotation);
    }
}