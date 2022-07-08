import { Key } from "readline";
import Cursor from "./Cursor";
import { KeyCode } from "./Key.enum";
import MathF from "./MathF";
import Time from "./Time";

export abstract class AxisInput {
  public value: number = 0;

  public abstract GetValue(): number;
  public abstract Update();
}

export class AxisInputMouse extends AxisInput {

  mouseAxis: string;
  min: number;
  max: number;
  nagativ: boolean;

  lastValue: number = 0;

  constructor(mouseAxis: string, min: number, max: number, nagativ: boolean) {
    super();
    this.mouseAxis = mouseAxis;
    this.min = min;
    this.max = max;
    this.nagativ = nagativ;
    this.value = 0;
  }

  public GetValue(): number {
    return this.nagativ ? -this.value : this.value;
  }

  public Update() {
    let _mousepos: number = Input.getMouseValue(this.mouseAxis);

    //console.log("_mousepos", _mousepos + ", " + this.lastValue);

    let v = (_mousepos - this.lastValue)
    //console.log(v)

    this.lastValue = _mousepos;

    /*if (_mousepos > this.lastValue) {
      this.value = 1;
      this.lastValue = _mousepos;
    }
    else if (_mousepos < this.lastValue) {
      this.value = -1;
      this.lastValue = _mousepos;
    }
    else if (this.lastValue === _mousepos) {
      this.value = 0;
      this.lastValue = _mousepos;
    }*/

    //this.value = MathF.clamp(this.value, this.min, this.max);
    //this.value = 0;

  }
}

export class AxisInputKey extends AxisInput {

  key: KeyCode;
  min: number;
  max: number;
  nagativ: boolean;

  GetValue(): number {
    return this.nagativ ? -this.value : this.value;
  }

  constructor(key: KeyCode, min: number, max: number, nagativ: boolean) {
    super();
    this.key = key;
    this.min = min;
    this.max = max;
    this.nagativ = nagativ;
    this.value = 0;
  }

  Update() {
    if (Input.getKeyDown(this.key)) {
      this.value += 0.1;
    }
    else {
      this.value -= 0.1;
    }

    this.value = MathF.clamp(this.value, this.min, this.max);

  }
}

export class InputSchema {
  name: string;
  axis: AxisInput[]
  constructor(name: string, axis: AxisInput[]) {
    this.name = name;
    this.axis = axis;
  }

  Update() {
    this.axis.forEach(axis => {
      axis.Update();
    });
  }
}

export default class Input {

  private static Instance: Input;

  domElement: HTMLElement;

  inputSchema: InputSchema[];
  inputBuffer: any[];
  mouseBuffer: any[];

  static getAxis(name: string): number {

    let axis = Input.Instance.inputSchema.find((x) => x.name === name);

    if (axis === undefined) {
      return 0;
    }

    let value = 0;

    axis.axis.forEach((x) => {
      value += x.GetValue();
    });

    return value;
  }

  static getKeyDown(key: KeyCode) {
    let BufferKey = Input.Instance.inputBuffer[key];
    if (BufferKey === undefined) {
      return false;
    }
    return BufferKey.down;
  }

  static getKeyUp(key: KeyCode) {
    let BufferKey = Input.Instance.inputBuffer[key];
    if (BufferKey === undefined) {
      return false;
    }
    return BufferKey.up;
  }

  static getMouseValue(name: string) {
    if (Input.Instance.mouseBuffer[name] === undefined) {
      return 0;
    }
    return Input.Instance.mouseBuffer[name].value;
  }

  constructor(domElement: HTMLElement) {
    this.domElement = domElement;
    this.inputBuffer = [];
    this.mouseBuffer = [];

    this.inputSchema = [
      new InputSchema("Horizontal", [
        new AxisInputKey(KeyCode.Z, 0, 1, false),
        new AxisInputKey(KeyCode.S, 0, 1, true),
      ]),
      new InputSchema("Vertical", [
        new AxisInputKey(KeyCode.Q, 0, 1, false),
        new AxisInputKey(KeyCode.D, 0, 1, true),
      ]),
      new InputSchema("Mouse X", [
        new AxisInputMouse("X", -1, 1, false),
      ]),
      new InputSchema("Mouse Y", [
        new AxisInputMouse("Y", -1, 1, false),
      ]),
    ];

    document.addEventListener("keydown", (e) => this.keydown(e));
    document.addEventListener("keyup", (e) => this.keyup(e))
    document.addEventListener('mousemove', (e) => this.mousemove(e));

    Input.Instance = this;
  }

  static Update() {
    Input.Instance.SystemInputUpdate();
  }


  SystemInputUpdate() {
    this.inputSchema.forEach(schema => {
      schema.Update();
    });

    //filter mouse buffer remove is delta < Time.deltaTime
    //console.log("Allo?");
    //console.log(this.mouseBuffer);


    /*
   
    for (let key in this.inputBuffer) {
      let buffer = this.inputBuffer[key];
      if (buffer.delta < Time.deltaTime) {
        delete this.inputBuffer[key];
      }
    }*/

  }

  timeout: any;
  mousemove(e: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => { this.mouseBuffer = [] }, 100);

    //console.log(event);
    //console.log("mousemove", (event.movementX || event.mozMovementX || event.webkitMovementX || 0))
    //console.log("mousemove", (event.movementY || event.mozMovementY || event.webkitMovementY || 0))

    if (Cursor.isLocked === false) return;

    this.mouseBuffer["X"] = {
      key: "X",
      value: (e.movementX || e.mozMovementX || e.webkitMovementX || 0)
    };

    this.mouseBuffer["Y"] = {
      key: "Y",
      value: (e.movementY || e.mozMovementY || e.webkitMovementY || 0)
    };

  }

  keydown(e: KeyboardEvent) {
    let code = e.which || e.keyCode;
    this.inputBuffer[code] = { key: code, down: true, up: false };
  }

  keyup(e: KeyboardEvent) {
    let code = e.which || e.keyCode;
    this.inputBuffer[code] = { key: code, up: true, down: false };
  }

}