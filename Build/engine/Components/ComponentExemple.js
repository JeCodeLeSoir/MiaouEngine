import {  Component  } from './Component.js';
export default class ComponentExemple extends Component {
    constructor() {
        super();
    }
    ctor_Awake() {
        this.gameObject?.scene.scene.add(this._object);
    }
    ctor_Update() {
    }
    isScript() {
        return false;
    }
}