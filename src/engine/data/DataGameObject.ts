import * as THREE from "@three";
import { Component } from "../Components/Component";
import { Transform } from "../Transform";
import { List } from "../utils/List";
import { DataScene } from "./DataScene";

export abstract class DataGameObject {
  public name: string;
  public transform: Transform;
  public components: List<Component>;

  public scene: DataScene | any;

  constructor() {
    console.log(THREE);
    this.name = "AnyGameObject";
    this.transform = new Transform();
    this.components = new List<Component>();
  }

  public async ctor(scene: DataScene) {
    this.scene = scene;
    await this.components.forEach(async (component: Component) => {
      console.log("=================", component);
      component.ctor(this);
      await component.ctor_Awake();
    });
  }

  public async ctorComponents() {
    try {
      for (let i = 0; i < this.components.length; i++) {
        let component: Component = List.Get(this.components, i, Component);
        let _Icomp = await component.NewIstance(this, component.componentType);

        if (_Icomp === undefined) {
          throw "One component is null !";
        }
        this.components[i] = _Icomp;
      }
    } catch (error) {
      console.log(error);
    }
  }

  ctor_Start() {
    this.components.forEach((component: Component) => {
      component.ctor_Start();
    });
  }


  public ctor_Update() {
    this.transform.ctor_Update();
    this.components.forEach((component: Component) => {
      component.ctor_Update();
    });
  }

}
