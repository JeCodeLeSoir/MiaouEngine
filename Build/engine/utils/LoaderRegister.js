export default class LoaderRegister {
    static register(name, callback) {
        LoaderRegister.loaders[name] = callback;
    }
    static unregister(name) {
        delete LoaderRegister.loaders[name];
    }
    static Clear() {
        LoaderRegister.loaders = {};
    }
    static loaders = {};
}