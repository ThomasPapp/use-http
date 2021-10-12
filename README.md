# use-http
React hook for async axios calls

### Example:
```js
const { loading, success, error, runHttpGet } = useHttp()
...
try {
    // the run http functions return a promise containing any data sent from the endpoint
    const data = await runHttpGet("/api/some_endpoint")
    ...
} catch (e) {
    // An error occurred, handle error responses here
    // Any non-successful http status codes get caught here too
}
```

### Available hook fields
The `useHttp` hook returns the following data which can be destructured 
```ts
interface HttpHook {
    loading: boolean,
    success: boolean,
    error: object | null,
    cancel: () => void,
    runHttpGet: (url: string) => Promise<any>,
    runHttpPost: (url: string, body: object) => Promise<any>,
    runHttpPut: (url: string, body: object) => Promise<any>,
    runHttpDelete: (url: string) => Promise<any>
}
```
