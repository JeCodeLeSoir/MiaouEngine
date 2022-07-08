import Cursor from './Cursor.js';
import {  KeyCode  } from './Key.enum.js';
import MathF from './MathF.js';
export class AxisInput {
    value = 0;
}
export class AxisInputMouse extends AxisInput {
    mouseAxis;
    min;
    max;
    nagativ;
    lastValue = 0;
    constructor(mouseAxis, min, max, nagativ) {
        super();
        this.mouseAxis = mouseAxis;
        this.min = min;
        this.max = max;
        this.nagativ = nagativ;
        this.value = 0;
    }
    GetValue() {
        return this.nagativ ? -this.value : this.value;
    }
    Update() {
        let _mousepos = Input.getMouseValue(this.mouseAxis);
        let v = (_mousepos - this.lastValue);
        this.lastValue = _mousepos;
    }
}
export class AxisInputKey extends AxisInput {
    key;
    min;
    max;
    nagativ;
    GetValue() {
        return this.nagativ ? -this.value : this.value;
    }
    constructor(key, min, max, nagativ) {
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
    name;
    axis;
    constructor(name, axis) {
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
    static Instance;
    domElement;
    inputSchema;
    inputBuffer;
    mouseBuffer;
    static getAxis(name) {
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
    static getKeyDown(key) {
        let BufferKey = Input.Instance.inputBuffer[key];
        if (BufferKey === undefined) {
            return false;
        }
        return BufferKey.down;
    }
    static getKeyUp(key) {
        let BufferKey = Input.Instance.inputBuffer[key];
        if (BufferKey === undefined) {
            return false;
        }
        return BufferKey.up;
    }
    static getMouseValue(name) {
        if (Input.Instance.mouseBuffer[name] === undefined) {
            return 0;
        }
        return Input.Instance.mouseBuffer[name].value;
    }
    constructor(domElement) {
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
        document.addEventListener("keyup", (e) => this.keyup(e));
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
    }
    timeout;
    mousemove(e) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => { this.mouseBuffer = []; }, 100);
        if (Cursor.isLocked === false)
            return;
        this.mouseBuffer["X"] = {
            key: "X",
            value: (e.movementX || e.mozMovementX || e.webkitMovementX || 0)
        };
        this.mouseBuffer["Y"] = {
            key: "Y",
            value: (e.movementY || e.mozMovementY || e.webkitMovementY || 0)
        };
    }
    keydown(e) {
        let code = e.which || e.keyCode;
        this.inputBuffer[code] = { key: code, down: true, up: false };
    }
    keyup(e) {
        let code = e.which || e.keyCode;
        this.inputBuffer[code] = { key: code, up: true, down: false };
    }
}