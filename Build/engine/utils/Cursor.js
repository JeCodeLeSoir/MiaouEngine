export default class Cursor {
    static Instance;
    domElement;
    constructor(domElement) {
        this.domElement = domElement;
        this.domElement.ownerDocument.addEventListener('pointerlockchange', (e) => this.onPointerlockChange(e));
        this.domElement.ownerDocument.addEventListener('pointerlockerror', (e) => this.onPointerlockError(e));
        Cursor.Instance = this;
    }
    static lock() {
        Cursor.Instance.lock();
    }
    static unlock() {
        Cursor.Instance.unlock();
    }
    lock() {
        this.domElement.requestPointerLock();
    }
    unlock() {
        this.domElement.ownerDocument.exitPointerLock();
    }
    ;
    onPointerlockChange(e) {
        console.log(e);
    }
    onPointerlockError(e) {
        console.log(e);
    }
}