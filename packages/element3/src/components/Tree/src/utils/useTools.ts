import { onBeforeUpdate } from 'vue'

export function useForRefs(
  arr: any[],
  map = (v: any) => v
): { (component: any): void } {
  onBeforeUpdate(() => {
    arr.length = 0
  })

  return (component: any) => {
    if (component) arr.push(map(component))
  }
}
