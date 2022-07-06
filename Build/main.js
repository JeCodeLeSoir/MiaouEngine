import PointerMain from './PointerMain.js';
async function init() {
    let container = document.getElementById("container");
    if (container === null) {
        console.log("container not found");
        return;
    }
    let main = await PointerMain.Load("data/main.json", PointerMain);
    await main.Run(container);
}
init();