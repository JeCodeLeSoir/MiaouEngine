import { Key } from "readline";
import { KeyCode } from "./Key.enum";
import MathF from "./MathF";

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

    this.value = (this.lastValue - _mousepos)
    this.value = MathF.clamp(this.value, this.min, this.max);

    this.lastValue = _mousepos;
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
  public static Instance: Input;

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

    Input.Instance = this;
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
      new InputSchema("MouseX", [
        new AxisInputMouse("X", -1, 1, false),
      ]),
      new InputSchema("MouseY", [
        new AxisInputMouse("Y", -1, 1, false),
      ]),
    ];

    document.addEventListener("keydown", (e) => this.keydown(e));
    document.addEventListener("keyup", (e) => this.keyup(e))
    //mouse
    document.addEventListener("mousemove", (e) => {
      this.mouseBuffer["X"] = { key: "MouseX", value: e.x };
      this.mouseBuffer["Y"] = { key: "MouseY", value: e.y };
    }, false);

    this.domElement.ownerDocument.addEventListener('mousemove', (event) => {

      this.mouseBuffer["X"] = { key: "MouseX", value: event.movementX };
      this.mouseBuffer["Y"] = { key: "MouseY", value: event.movementY };

    }, false);
  }

  Update() {
    this.inputSchema.forEach(schema => {
      schema.Update();
    });
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