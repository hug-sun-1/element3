<template>
  <div
    data-testid="el-time-spinner"
    class="el-time-spinner"
    :class="{ 'has-seconds': showSeconds, 'has-arrow': arrowControl }"
  >
    <div class="el-time-panel__content">
      <template v-if="!arrowControl">
        <el-scrollbar
          v-for="item in spinnerItems"
          :key="item"
          class="el-time-spinner__wrapper"
          wrap-style="max-height: inherit;"
          view-class="el-time-spinner__list"
          role="el-time-spinner__wrapper"
          :ref="getRefItem(item)"
          @mouseenter="emitSelectRange(item)"
          @mouseleave="setRangeValue(item)"
          noresize
          tag="ul"
        >
          <li
            v-for="(disabled, key) in listMap(item)"
            :key="key"
            class="el-time-spinner__item"
            :role="key == activeMaps(item) ? 'active' : null"
            :class="{ active: key == activeMaps(item), disabled }"
          >
            {{ ('0' + key).slice(-2) }}
          </li>
        </el-scrollbar>
      </template>
      <template v-if="arrowControl">
        <div
          v-for="item in spinnerItems"
          :key="item"
          class="el-time-spinner__wrapper is-arrow"
          @mouseenter="emitSelectRange(item)"
        >
          <i
            class="el-time-spinner__arrow el-icon-arrow-up"
            @click="clickScroll(1)"
          ></i>
          <i
            class="el-time-spinner__arrow el-icon-arrow-down"
            @click="clickScroll(-1)"
          ></i>
          <ul class="el-time-spinner__list">
            <li
              v-for="(disabled, key) in listMap(item)"
              :key="key"
              class="el-time-spinner__item"
              :class="{ active: key == activeMaps(item), disabled }"
            >
              {{ ('0' + key).slice(-2) }}
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  toRefs,
  watch,
  onMounted,
  nextTick
} from 'vue'
import { props } from './props'
import { useDateTime } from './entity/DateTime'
import { debounce } from 'throttle-debounce'
import elScrollbar from '../../../../packages/scrollbar/Scrollbar'
export default defineComponent({
  name: 'ElDatePicker',
  props,
  emits: ['update:modelValue', 'select-range'],
  components: { elScrollbar },
  setup(props, ctx) {
    const { getDisabledArr, makeList } = useDateTime()
    const { selectableRange, modelValue } = toRefs(props)
    const spinnerItems = computed(() => {
      const arr = ['hours', 'minutes', 'seconds']
      return props.showSeconds ? arr : arr.slice(0, 2)
    })

    const listMap = (type: string) => {
      const disList = (selectableRange?.value as string[]) || []
      const list = {
        hours: makeList(24, getDisabledArr(disList, 'hours')),
        minutes: makeList(60, getDisabledArr(disList, 'minutes')),
        seconds: makeList(60, getDisabledArr(disList, 'seconds'))
      }
      return list[type]
    }

    const activeMaps = (type: string) => {
      const typeList = { hours: 0, minutes: 1, seconds: 2 }
      if (modelValue?.value) return modelValue.value.split(':')[typeList[type]]
      else ''
    }
    const getRefItem = (item: string) => {
      const upperItem = item.charAt(0).toUpperCase() + item.slice(1)
      return `${upperItem}Ref`
    }
    const HoursRef = ref(null)
    const MinutesRef = ref(null)
    const SecondsRef = ref(null)
    const listRefsMap = {
      hours: HoursRef,
      minutes: MinutesRef,
      seconds: SecondsRef
    }

    const emitSelectRange = (type: string) => {
      if (type === 'hours') {
        ctx.emit('select-range', 0, 2)
      } else if (type === 'minutes') {
        ctx.emit('select-range', 3, 5)
      } else if (type === 'seconds') {
        ctx.emit('select-range', 6, 8)
      }
      currentSeletedBar.value = type
    }

    const adjustSpinners = () => {
      adjustCurrentSpinner('hours')
      adjustCurrentSpinner('minutes')
      adjustCurrentSpinner('seconds')
    }

    const getDomEl = (type: string) => {
      const el = listRefsMap[type]
      return el.value?.$el
    }
    const getBarHeight = (type: string) => {
      const domEl = getDomEl(type)
      const offsetHeight = domEl.querySelector('li').offsetHeight
      return offsetHeight
    }

    const currentSeletedBar = ref(null)
    const adjustCurrentSpinner = (type: string) => {
      if (props.arrowControl) return
      let activeValue = activeMaps(type)
      const domEl = getDomEl(type)
      if (domEl) {
        domEl.querySelector('.el-scrollbar__wrap').scrollTop = Math.max(
          0,
          Number(activeValue) * getBarHeight(type)
        )
      }
    }

    const scrollEvent = () => {
      const scrollTypeFuc = (type: string) => {
        if (!getDomEl(type)) return
        const currentScroll = getDomEl(type).querySelector(
          '.el-scrollbar__wrap'
        )
        currentScroll.addEventListener('scroll', () => {
          debounce(500, handlerScroll(type))
        })
      }
      spinnerItems.value.forEach((item) => scrollTypeFuc(item))
    }
    const curentScrollValue = ref(null)
    const handlerScroll = (type: string) => {
      const currentScroll = getDomEl(type).querySelector('.el-scrollbar__wrap')
      const scrollTop = currentScroll.scrollTop
      curentScrollValue.value = Math.floor(scrollTop / getBarHeight(type))
    }
    const nowModelValue = ref(null)
    const setRangeValue = (type: string) => {
      const list = { hours: 0, minutes: 1, seconds: 2 }
      const modelValueString = nowModelValue.value.split(':')
      modelValueString[list[type]] = setDateByRange()
      nowModelValue.value = modelValueString.join(':')
    }
    const setDateByRange = () => {
      let rangList = []
      const type = currentSeletedBar.value
      listMap(type).forEach((item: string, index: number) => {
        if (!item) rangList.push(index)
      })
      if (curentScrollValue.value < rangList[0]) return rangList[0]
      if (curentScrollValue.value > rangList[rangList.length - 1])
        return rangList[rangList.length - 1]
      return curentScrollValue.value
    }

    const clickScroll = (num: number) => {
      console.log(num)
    }

    watch(
      () => modelValue?.value,
      () => {
        adjustSpinners()
      }
    )

    const save = () => {
      setDateByRange()
      ctx.emit('update:modelValue', nowModelValue.value)
    }

    const undo = () => {
      adjustSpinners()
      ctx.emit('update:modelValue', modelValue.value)
    }

    onMounted(() => {
      nextTick(() => {
        !props.arrowControl && scrollEvent()
        currentSeletedBar.value = null
        nowModelValue.value = modelValue.value
        adjustSpinners()
      })
    })
    return {
      spinnerItems,
      listMap,
      getRefItem,
      activeMaps,
      listRefsMap,
      HoursRef,
      MinutesRef,
      SecondsRef,
      emitSelectRange,
      adjustSpinners,
      currentSeletedBar,
      adjustCurrentSpinner,
      scrollEvent,
      setRangeValue,
      curentScrollValue,
      clickScroll,
      undo,
      save
    }
  }
})
</script>

<style>
.el-scrollbar__wrap {
  max-height: inherit;
}
</style>
