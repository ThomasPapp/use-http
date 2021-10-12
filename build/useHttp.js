"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const defaultState = {
    loading: false,
    success: false,
    error: null,
};
const execute = (url, type, setState, payload) => __awaiter(void 0, void 0, void 0, function* () {
    setState(Object.assign(Object.assign({}, defaultState), { loading: true }));
    let axiosPromise = null;
    if (type === "GET") {
        axiosPromise = axios_1.default.get(url, { cancelToken: payload.source.token });
    }
    else if (type === "POST") {
        axiosPromise = axios_1.default.post(url, payload.body, { cancelToken: payload.source.token });
    }
    else if (type === "PUT") {
        axiosPromise = axios_1.default.put(url, payload.body, { cancelToken: payload.source.token });
    }
    else if (type === "DELETE") {
        axiosPromise = axios_1.default.delete(url, { cancelToken: payload.source.token });
    }
    if (!axiosPromise) {
        throw new Error(`Invalid http request type of ${type}`);
    }
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield axiosPromise;
            setState(Object.assign(Object.assign({}, defaultState), { success: true }));
            if (result)
                resolve(result.data);
        }
        catch (e) {
            setState(Object.assign(Object.assign({}, defaultState), { error: e }));
            reject(e);
        }
    }));
});
const useHttp = () => {
    const [state, setState] = react_1.useState(defaultState);
    const source = axios_1.default.CancelToken.source();
    const cancel = () => source.cancel("Request canceled by the user.");
    const runHttpGet = (url) => __awaiter(void 0, void 0, void 0, function* () { return execute(url, "GET", setState, { source }); });
    const runHttpPost = (url, body) => __awaiter(void 0, void 0, void 0, function* () { return execute(url, "POST", setState, { source, body }); });
    const runHttpPut = (url, body) => __awaiter(void 0, void 0, void 0, function* () { return execute(url, "PUT", setState, { source, body }); });
    const runHttpDelete = (url) => __awaiter(void 0, void 0, void 0, function* () { return execute(url, "DELETE", setState, { source }); });
    return {
        loading: state.loading,
        success: state.success,
        error: state.error,
        cancel,
        runHttpGet,
        runHttpPost,
        runHttpPut,
        runHttpDelete
    };
};
exports.default = useHttp;
//# sourceMappingURL=useHttp.js.map