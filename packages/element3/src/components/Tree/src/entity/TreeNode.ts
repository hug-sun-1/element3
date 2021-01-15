import {
  DefaultPropKey,
  TreeNodeKeys,
  TreeNodeInstance,
  TreeNodeProps,
  ID
} from '../types'
import { watch } from '../utils/effect'

export class TreeNode<RawNode> implements TreeNodeProps<RawNode> {
  private dk: DefaultPropKey<RawNode> = {
    id: 'id',
    label: 'label',
    children: 'children',
    parent: 'parent',
    isVisible: 'isVisible',
    isDisabled: 'isDisabled',
    isExpanded: 'isExpanded',
    isChecked: 'isChecked'
  }
  private instance: TreeNodeInstance<RawNode> = {
    id: 0,
    label: '',
    children: [],
    parent: null,
    isVisible: true,
    isDisabled: false,
    isExpanded: true,
    isChecked: false
  }

  raw: RawNode

  constructor(
    rawNode: RawNode,
    parent: TreeNode<RawNode>,
    dk: DefaultPropKey<RawNode>,
    dv: TreeNodeInstance<RawNode>
  ) {
    Object.assign(this.dk, dk)
    Object.assign(this.instance, dv)

    this.raw = rawNode
    this.instance.parent = parent

    this.effect(rawNode, dk, dv)
  }

  // readonly
  get level(): number {
    return (this.parent?.level ?? -1) + 1
  }

  // readonly
  get isLeaf(): boolean {
    return this.get('children').length === 0
  }

  get id(): ID {
    return this.get('id')
  }

  set id(v: ID) {
    this.set('id', v)
  }

  get label(): string {
    return this.get('label')
  }

  set label(v: string) {
    this.set('label', v)
  }

  // readonly
  get parent(): TreeNode<RawNode> {
    return this.instance.parent
  }

  // readonly
  get children(): TreeNode<RawNode>[] {
    return this.instance.children
  }

  get isVisible(): boolean {
    return this.get('isVisible')
  }

  set isVisible(v: boolean) {
    this.set('isVisible', v)
  }

  get isChecked(): boolean {
    return this.get('isChecked')
  }

  set isChecked(v: boolean) {
    this.set('isChecked', v)
  }

  get isExpanded(): boolean {
    return this.get('isExpanded')
  }

  set isExpanded(v: boolean) {
    this.set('isExpanded', v)
  }

  get isDisabled(): boolean {
    return this.get('isDisabled')
  }

  set isDisabled(v: boolean) {
    this.set('isDisabled', v)
  }

  get(tk: TreeNodeKeys): any {
    if (!Reflect.has(this.dk, tk)) {
      return this.raw[tk]
    }
    return this.raw[this.dk[tk as string]] ?? this.instance[tk]
  }

  set(tk: TreeNodeKeys, val: unknown): void {
    if (!Reflect.has(this.dk, tk)) {
      this.raw[tk] = val
      return
    }
    if (Reflect.has(this.raw as any, this.dk[tk])) {
      this.raw[this.dk[tk as string]] = val
      return
    }
    this.instance[tk as string] = val
  }

  /**
   * reactive raw to this
   */
  effect(
    raw: RawNode,
    dk: DefaultPropKey<RawNode>,
    dv: TreeNodeInstance<RawNode>
  ): void {
    // when raw change
    this.raw = watch(raw, (e) => {
      if (e.type === 'set') {
        if (e.key === this.dk.children && e.value instanceof Array) {
          this.instance.children = e.value.map(
            (node) => new TreeNode<RawNode>(node, this, dk, dv)
          )
        } else {
          this.instance[this.findDkByRk(e.key as keyof RawNode)] = e.value
        }
      }
    })

    // when raw children change
    if (raw[this.dk.children as string])
      this.raw[this.dk.children as string] = watch(
        raw[this.dk.children as string],
        (e) => {
          if (e.type === 'set') {
            this.instance.children[e.key] =
              typeof e.value === 'object'
                ? new TreeNode<RawNode>(e.value, this, dk, dv)
                : e.value
          }
        }
      )
  }

  expand(is = !this.isExpanded): void {
    this.isExpanded = is
  }

  findDkByRk(rk: keyof RawNode): string | null {
    for (const key in this.dk) {
      if (Object.prototype.hasOwnProperty.call(this.dk, key)) {
        const v = this.dk[key]
        if (v === rk) {
          return key
        }
      }
    }
    return null
  }
}
