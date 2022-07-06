import * as THREE from '@three';

export class Transform {

   public position: THREE.Vector3;
   public rotation: THREE.Quaternion;
   public scale: THREE.Vector3;
   public parent: Transform | undefined;

   public localPosition: THREE.Vector3;
   public localRotation: THREE.Quaternion;
   public localScale: THREE.Vector3;

   constructor() {
      this.position = new THREE.Vector3();
      this.rotation = new THREE.Quaternion();
      this.scale = new THREE.Vector3(1, 1, 1);

      this.localPosition = new THREE.Vector3();
      this.localRotation = new THREE.Quaternion();
   }

   public ctor_Update() {
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

   public SetParent(parent: Transform | undefined) {
      this.parent = parent;
   }

   public SetPosition(x: number, y: number, z: number) {
      this.position.set(x, y, z);
   }

   public SetRotation(x: number, y: number, z: number, w: number) {
      this.rotation.set(x, y, z, w);
   }

   public SetScale(x: number, y: number, z: number) {
      this.scale.set(x, y, z);
   }

   public SetLocalPosition(x: number, y: number, z: number) {
      this.localPosition.set(x, y, z);
   }

   public SetLocalRotation(x: number, y: number, z: number, w: number) {
      this.localRotation.set(x, y, z, w);
   }

   public GetPosition(): THREE.Vector3 {
      return this.position;
   }

   public GetRotation(): THREE.Quaternion {
      return this.rotation;
   }

   public GetScale(): THREE.Vector3 {
      return this.scale;
   }

   public GetLocalPosition(): THREE.Vector3 {
      return this.localPosition;
   }

   public GetLocalRotation(): THREE.Quaternion {
      return this.localRotation;
   }

   public GetWorldPosition(): THREE.Vector3 {
      if (this.parent) {
         return this.position.add(this.parent.GetWorldPosition());
      }
      return this.position;
   }

   public GetWorldRotation(): THREE.Quaternion {
      if (this.parent) {
         return this.rotation.multiply(this.parent.GetWorldRotation());
      }
      return this.rotation;
   }

   public GetWorldScale(): THREE.Vector3 {
      if (this.parent) {
         return this.scale.multiply(this.parent.GetWorldScale());
      }
      return this.scale;
   }

   public GetLocalToWorldMatrix(): THREE.Matrix4 {
      let matrix = new THREE.Matrix4();
      matrix.makeRotationFromQuaternion(this.GetWorldRotation());
      matrix.setPosition(this.GetWorldPosition());
      return matrix;
   }

   public GetWorldToLocalMatrix(): THREE.Matrix4 {
      let matrix = new THREE.Matrix4();
      matrix.makeRotationFromQuaternion(this.GetLocalRotation().inverse());
      matrix.setPosition(this.GetLocalPosition().negate());
      return matrix;
   }

   public GetLocalToWorldPosition(): THREE.Vector3 {
      return this.GetWorldPosition().sub(this.GetWorldToLocalMatrix().getPosition());
   }

   public GetWorldToLocalPosition(): THREE.Vector3 {
      return this.GetLocalPosition().sub(this.GetLocalToWorldMatrix().getPosition());
   }

   public GetLocalToWorldRotation(): THREE.Quaternion {
      return this.GetWorldRotation().multiply(this.GetLocalToWorldMatrix().getRotation());
   }

   public GetWorldToLocalRotation(): THREE.Quaternion {
      return this.GetLocalRotation().multiply(this.GetWorldToLocalMatrix().getRotation());
   }

   public LookAt(target: THREE.Vector3, up: THREE.Vector3) {
      this.rotation.setFromRotationMatrix(new THREE.Matrix4().lookAt(this.position, target, up));
   }

   public LookAtLocal(target: THREE.Vector3, up: THREE.Vector3) {
      this.localRotation.setFromRotationMatrix(new THREE.Matrix4().lookAt(this.localPosition, target, up));
   }

   public Translate(x: number, y: number, z: number) {
      this.position.add(new THREE.Vector3(x, y, z));
   }
}