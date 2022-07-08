import { Component } from "./Component";
import MonoBehaviour from "./MonoBehaviour";

export class ComponentScript extends Component {

    private instance: MonoBehaviour | any;

    public scriptPath: string;

    constructor() {
        super();
        this.scriptPath = "";
    }

    public async ctor_Awake() {
        let sMonoBehaviour: any = await import(this.scriptPath);
        this.instance = Object.assign(new sMonoBehaviour.default(), this);
    }

    public ctor_Start() {
        super.ctor_Start();

        if (this.isScript()) {
            this.instance.Awake();
            this.instance.Start();
        }
    }

    public ctor_Update() {
        super.ctor_Update();

        if (this.isScript()) {
            this.instance.Update();
            this.instance.LateUpdate();
            this.instance.FixedUpdate();
            this.instance.PhysicsUpdate();
        }
    }

    public GetMonoBehaviour(): MonoBehaviour | any {
        return this.instance;
    }

    public isScript(): boolean {
        if (!this.instance)
            return false;
        return this.instance instanceof MonoBehaviour;
    }

}