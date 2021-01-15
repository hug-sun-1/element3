export type WatchCbEv = {
  type: 'get' | 'set' | 'del'
  target: any
  key: string | number | symbol
  value?: any
  receiver?: any
}

export function watch<T>(obj: T, callback: (e: WatchCbEv) => void): T {
  const proxy = new Proxy(obj as any, {
    get(target, key, receiver) {
      callback({
        type: 'get',
        target,
        key,
        receiver
      })
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      callback({
        type: 'set',
        target,
        key,
        value,
        receiver
      })
      return Reflect.set(target, key, value, receiver)
    },
    deleteProperty(target, key) {
      callback({
        type: 'del',
        target,
        key
      })
      return Reflect.deleteProperty(target, key)
    }
  })
  return proxy as T
}
