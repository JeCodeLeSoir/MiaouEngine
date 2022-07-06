import { List } from "../utils/List";
import { DataJson } from "../DataJson";

export class DataPointerMain extends DataJson {
    
    DefaultScene: number = 0;
    PathScenes: List<string> = new List<string>();

    public OnLoad() {
        
    }

    constructor() {
        super();
        this.PathScenes = new List<string>();
    }
}