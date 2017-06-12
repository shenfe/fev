export function name(targetClass) {
    return name => {
        targetClass.name = name;
        targetClass.prototype.name = name;
    };
}
