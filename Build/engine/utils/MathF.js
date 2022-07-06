export default class MathF {
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}