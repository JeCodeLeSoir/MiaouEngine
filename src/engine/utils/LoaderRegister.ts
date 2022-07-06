export default class LoaderRegister {

    public static register(name: string, callback: Function) {
        LoaderRegister.loaders[name] = callback;
    }

    public static unregister(name: string) {
        delete LoaderRegister.loaders[name];
    }

    public static Clear() {
        LoaderRegister.loaders = {};
    }

    public static loaders: { [key: string]: Function } = {};
}