export default abstract class Object {

    private uuid: string;

    constructor() {
        this.uuid = this.NewUuid();
    }

    public GetUuid(): string {
        return this.uuid;
    }

    private NewUuid() {
        return 'xxxyxxxx-xxxx-xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}