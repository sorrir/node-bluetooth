export async function sleep(ms): Promise<unknown> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export type RetryOptions = {
    maxRetries: number
    retryIntervalMs: number
}

export type ReturnFunction<T> = (...args: any[]) => Promise<T>
export type NoReturnFunction<T> = (...args: any[]) => void

export async function retry<T>(options: RetryOptions, fn: ReturnFunction<T>, ...args: any[]): Promise<T> {
    return _retry(options.maxRetries, options.retryIntervalMs, fn, ...args)
}

async function _retry<T>(retriesLeft: number, retryIntervalMs: number, fn: ReturnFunction<T>, ...args: any[]): Promise<T> {
    const result = await fn(...args)
    if (result) { return result }
    await sleep(retryIntervalMs)
    retriesLeft--
    return _retry(retriesLeft, retryIntervalMs, fn, ...args)
}

export function firstResolve<T>(promises: Promise<T>[]) {
    return Promise.all(promises.map(p => {
        // If a request fails, count that as a resolution so it will keep
        // waiting for other possible successes. If a request succeeds,
        // treat it as a rejection so Promise.all immediately bails out.
        return p.then(
            val => Promise.reject(val),
            err => Promise.resolve(err)
        );
    })).then(
        // If '.all' resolved, we've just got an array of errors.
        errors => Promise.reject(errors),
        // If '.all' rejected, we've got the result we wanted.
        val => Promise.resolve(val)
    );
}
