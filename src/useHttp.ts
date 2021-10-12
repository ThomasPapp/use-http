import { useState } from 'react'
import axios, { AxiosResponse, CancelTokenSource } from 'axios'

export interface HttpHook {
    loading: boolean,
    success: boolean,
    error: object | null,
    cancel: () => void,
    runHttpGet: (url: string) => Promise<any>,
    runHttpPost: (url: string, body: object) => Promise<any>,
    runHttpPut: (url: string, body: object) => Promise<any>,
    runHttpDelete: (url: string) => Promise<any>
}

export interface HttpRequestPayload {
    source: CancelTokenSource,
    body?: object
}


interface HttpHookState {
    loading: boolean,
    success: boolean,
    error: any | null,
}

const defaultState = {
    loading: false,
    success: false,
    error: null,
}

const execute = async (url: string, type: string, setState: React.Dispatch<React.SetStateAction<HttpHookState>>, payload: HttpRequestPayload) => {
    setState({ ...defaultState, loading: true })

    let axiosPromise: Promise<AxiosResponse<any>> | null = null

    if (type === "GET") {
        axiosPromise = axios.get(url, { cancelToken: payload.source.token })
    }
    else if (type === "POST") {
        axiosPromise = axios.post(url, payload.body, { cancelToken: payload.source.token })
    }
    else if (type === "PUT") {
        axiosPromise = axios.put(url, payload.body, { cancelToken: payload.source.token })
    }
    else if (type === "DELETE") {
        axiosPromise = axios.delete(url, { cancelToken: payload.source.token })
    }

    if (!axiosPromise) {
        throw new Error(`Invalid http request type of ${type}`);
    }

    return new Promise(async (resolve, reject) => {
        try {
            const result = await axiosPromise
            setState({ ...defaultState, success: true })
            if (result)
                resolve(result.data)
        } catch (e) {
            setState({...defaultState, error: e})
            reject(e)
        }
    })
}

const useHttp = ():HttpHook  => {
    const [state, setState] = useState<HttpHookState>(defaultState)

    const source = axios.CancelToken.source()

    const cancel = (): void => source.cancel("Request canceled by the user.")

    const runHttpGet = async (url: string) => execute(url, "GET", setState, { source })

    const runHttpPost = async (url: string, body: object) => execute(url, "POST", setState, { source, body })

    const runHttpPut = async (url: string, body: object) => execute(url, "PUT", setState, { source, body })

    const runHttpDelete = async (url: string) => execute(url, "DELETE", setState, { source })

    return {
        loading: state.loading,
        success: state.success,
        error: state.error,
        cancel,
        runHttpGet,
        runHttpPost,
        runHttpPut,
        runHttpDelete
    }
}

export default useHttp