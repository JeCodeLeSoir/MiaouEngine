import {  List  } from '../utils/List.js';
import {  DataJson  } from '../DataJson.js';
export class DataPointerMain extends DataJson {
    DefaultScene = 0;
    PathScenes = new List();
    OnLoad() {
    }
    constructor() {
        super();
        this.PathScenes = new List();
    }
}