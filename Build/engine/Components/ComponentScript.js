import {  Component  } from './Component.js';
import MonoBehaviour from './MonoBehaviour.js';
export class ComponentScript extends Component {
    instance;
    scriptPath;
    constructor() {
        super();
        this.scriptPath = "";
    }
    async ctor_Awake() {
        let sMonoBehaviour = await import(this.scriptPath);
        this.instance = Object.assign(new sMonoBehaviour.default(), this);
    }
    ctor_Start() {
        super.ctor_Start();
        if (this.isScript()) {
            this.instance.Awake();
            this.instance.Start();
        }
    }
    ctor_Update() {
        super.ctor_Update();
        if (this.isScript()) {
            this.instance.Update();
            this.instance.LateUpdate();
            this.instance.FixedUpdate();
            this.instance.PhysicsUpdate();
        }
    }
    GetMonoBehaviour() {
        return this.instance;
    }
    isScript() {
        if (!this.instance)
            return false;
        return this.instance instanceof MonoBehaviour;
    }
}