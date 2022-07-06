export class Type {
    public static Cast<T, R>(a: T, r: R): T {
        return r && Object.assign(a, r);
    }
}