import { Component } from "./Component";
import * as THREE from '@three';

export default class ComponentExemple extends Component {



    constructor() {
        super();
    }

    public ctor_Awake() {
        this.gameObject?.scene.scene.add(this._object);
    }

    public ctor_Update() {

    }

    public isScript(): boolean {
        return false;
    }
}