
let toCammelCase = function (params) {
    return params.charAt(0).toUpperCase() + params.substring(1, params.length);
}
exports.toCammelCase = toCammelCase;