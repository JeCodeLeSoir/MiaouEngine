import { CleanPlugin } from "webpack";

export default class Cursor {
    static Instance: Cursor;

    static isLocked: boolean = false;

    domElement: HTMLElement;

    constructor(domElement: HTMLElement) {
        this.domElement = domElement;

        this.domElement.ownerDocument.addEventListener('pointerlockchange',
            (e) => this.onPointerlockChange(e));

        this.domElement.ownerDocument.addEventListener('pointerlockerror',
            (e) => this.onPointerlockError(e));

        Cursor.Instance = this;
    }

    static lock() {

        Cursor.Instance.lock();
    }

    static unlock() {

        Cursor.Instance.unlock();
    }

    private lock() {
        this.domElement.requestPointerLock();
    }

    private unlock() {
        this.domElement.ownerDocument.exitPointerLock();
    };

    onPointerlockChange(e: any) {
        if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
            Cursor.isLocked = true;
        }
        else {
            Cursor.isLocked = false;
        }
    }

    onPointerlockError(e: any) {
        console.log(e);
    }

}

