export const awaitBeforeRun = fn => async val => fn(await val)

export const getRandomFrom = arr => arr[Math.random() * arr.length | 0]
export const getRandomFromPromise = awaitBeforeRun(getRandomFrom)
