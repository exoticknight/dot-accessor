"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dotPath(pathStr, obj) {
    if (typeof pathStr !== 'string')
        throw new Error('path must be string.');
    var path = pathStr.split('.');
    function fun(obj, cb) {
        var current = obj;
        var parent;
        var propName;
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var prop = path_1[_i];
            parent = current;
            propName = prop;
            if (current !== undefined) {
                current = current[prop];
            }
            if (parent === undefined) {
                propName = undefined;
                break;
            }
        }
        cb(parent, propName);
    }
    function access(obj) {
        var ret;
        fun(obj, function (o, p) { return ret = p ? o[p] : o; });
        return ret;
    }
    access['get'] = function (obj) {
        var ret;
        fun(obj, function (o, p) { return ret = p ? o[p] : o; });
        return ret;
    };
    access['set'] = function (obj, value) { return fun(obj, function (o, p) { if (p)
        o[p] = value; }); };
    access['delete'] = function (obj) { return fun(obj, function (o, p) { if (o)
        delete o[p]; }); };
    if (obj) {
        return access(obj);
    }
    else {
        return access;
    }
}
exports.default = dotPath;
//# sourceMappingURL=index.js.map