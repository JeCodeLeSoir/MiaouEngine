import { GameObject } from "../GameObject";
import Object from "../Object";

export abstract class IComponent extends Object {

    constructor() {
        super();
    }

    public abstract _object: any;

    public abstract ctor(gameObject: GameObject);
    public abstract NewIstance(gameObject: GameObject, componentType: string): any;

    public abstract ctor_Awake();
    public abstract ctor_Start();
    public abstract ctor_Update();
}
