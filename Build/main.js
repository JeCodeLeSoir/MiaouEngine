import * as THREE from 'http://localhost/Meta/Build/three/three.module.js';
import PointerMain from './PointerMain.js';
async function init() {
    console.log(THREE);
    let container = document.getElementById("container");
    if (container === null) {
        console.log("container not found");
        return;
    }
    let main = await PointerMain.Load("data/main.json", PointerMain);
    await main.Run(container);
}
init();