export interface accessor {
    (obj: any): any;
    get: (obj: any) => any;
    set: (obj: any, value: any) => void;
    delete: (obj: any) => boolean;
}
/**
 * generate an dot access function for specified path
 *
 * 生成一个使用点操作符访问对应路径数据的访问器
 *
 * @param {string} pathStr path string defined with dot access
 * @param {any} obj
 * @returns {(obj) => any | any}
 */
declare function dotPath(pathStr: string): accessor;
declare function dotPath(pathStr: string, obj: any): any;
export default dotPath;
