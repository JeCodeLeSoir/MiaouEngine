export default class Object {
    uuid;
    constructor() {
        this.uuid = this.NewUuid();
    }
    GetUuid() {
        return this.uuid;
    }
    NewUuid() {
        return 'xxxyxxxx-xxxx-xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}