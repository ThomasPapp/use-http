import { CancelTokenSource } from 'axios';
export interface HttpHook {
    loading: boolean;
    success: boolean;
    error: object | null;
    cancel: () => void;
    runHttpGet: (url: string) => Promise<any>;
    runHttpPost: (url: string, body: object) => Promise<any>;
    runHttpPut: (url: string, body: object) => Promise<any>;
    runHttpDelete: (url: string) => Promise<any>;
}
export interface HttpRequestPayload {
    source: CancelTokenSource;
    body?: object;
}
declare const useHttp: () => HttpHook;
export default useHttp;
