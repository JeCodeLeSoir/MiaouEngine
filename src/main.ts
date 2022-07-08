import * as THREE from "@three";
import PointerMain from "./PointerMain";

async function init() {

  console.log(THREE);

  let container = document.getElementById(
    "container"
  ) as HTMLInputElement | null;

  if (container === null) {
    console.log("container not found");
    return;
  }

  let main: PointerMain = await PointerMain.Load("data/main.json", PointerMain);

  await main.Run(container);
}

init();
