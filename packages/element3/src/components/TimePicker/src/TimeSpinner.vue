<template>
  <div class="el-time-spinner">
    <template v-if="!arrowControl">
      <el-scrollbar
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        ref="hours"
      >
        <li
          v-for="(disabled, hour) in hoursList"
          class="el-time-spinner__item"
          :key="hour"
          :class="{ active: hour === hours, disabled: disabled }"
        >
          {{ ('0' + hour).slice(-2) }}
        </li>
      </el-scrollbar>
      <el-scrollbar
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        ref="minutes"
      >
        <li
          v-for="(disabled, minute) in minutesList"
          class="el-time-spinner__item"
          :key="minute"
          :class="{ active: minute === minutes, disabled: disabled }"
        >
          {{ ('0' + minute).slice(-2) }}
        </li>
      </el-scrollbar>
      <el-scrollbar
        v-show="showSeconds"
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        ref="seconds"
      >
        <li
          v-for="(second, key) in 60"
          class="el-time-spinner__item"
          :class="{ active: key === seconds }"
          :key="key"
        >
          {{ ('0' + key).slice(-2) }}
        </li>
      </el-scrollbar>
    </template>
    <template v-if="arrowControl"
      ><div
        @mouseenter="emitSelectRange('hours')"
        class="el-time-spinner__wrapper is-arrow"
      >
        <i
          v-repeat-click="decrease"
          class="el-time-spinner__arrow el-icon-arrow-up"
        ></i>
        <i
          v-repeat-click="increase"
          class="el-time-spinner__arrow el-icon-arrow-down"
        ></i>
        <!-- <ul class="el-time-spinner__list" ref="hours">
          <li
            class="el-time-spinner__item"
            :class="{ active: hour === hours, disabled: hoursList[hour] }"
            v-for="(hour, key) in arrowHourList"
            :key="key"
          >
            {{
              hour === undefined
                ? ''
                : ('0' + (amPmMode ? hour % 12 || 12 : hour)).slice(-2) +
                  amPm(hour)
            }}
          </li>
        </ul> -->
      </div>
      <div
        @mouseenter="emitSelectRange('minutes')"
        class="el-time-spinner__wrapper is-arrow"
      >
        <i
          v-repeat-click="decrease"
          class="el-time-spinner__arrow el-icon-arrow-up"
        ></i>
        <i
          v-repeat-click="increase"
          class="el-time-spinner__arrow el-icon-arrow-down"
        ></i>
        <!-- <ul class="el-time-spinner__list" ref="minutes">
          <li
            class="el-time-spinner__item"
            :class="{ active: minute === minutes }"
            v-for="(minute, key) in arrowMinuteList"
            :key="key"
          >
            {{ minute === undefined ? '' : ('0' + minute).slice(-2) }}
          </li>
        </ul> -->
      </div>
      <div
        @mouseenter="emitSelectRange('seconds')"
        class="el-time-spinner__wrapper is-arrow"
        v-if="showSeconds"
      >
        <i
          v-repeat-click="decrease"
          class="el-time-spinner__arrow el-icon-arrow-up"
        ></i>
        <i
          v-repeat-click="increase"
          class="el-time-spinner__arrow el-icon-arrow-down"
        ></i>
        <!-- <ul class="el-time-spinner__list" ref="seconds">
          <li
            v-for="(second, key) in arrowSecondList"
            class="el-time-spinner__item"
            :class="{ active: second === seconds }"
            :key="key"
          >
            {{ second === undefined ? '' : ('0' + second).slice(-2) }}
          </li>
        </ul> -->
      </div>
    </template>
  </div>
</template>

<script>
import { ElScrollbar } from '../../../index'
import { getRangeHours, getRangeMinutes } from '../../../../src/utils/date-util'
import RepeatClick from '../../../../src/directives/repeatClick'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'ElTimeSpinner',
  components: { ElScrollbar },
  directives: {
    repeatClick: RepeatClick
  },
  props: {
    modelValue: {
      type: Date,
      default: new Date()
    },
    showSeconds: {
      type: Boolean,
      default: true
    },
    arrowControl: Boolean
  },
  emits: ['update:modelValue', 'mouse-over'],
  setup(props) {
    const hours = computed(() => {
      return props.modelValue.getHours()
    })

    const minutes = computed(() => {
      return props.modelValue.getMinutes()
    })

    const seconds = computed(() => {
      return props.modelValue.getSeconds()
    })

    let selectableRange = []
    const hoursList = computed(() => {
      return getRangeHours(selectableRange)
    })

    const minutesList = computed(() => {
      return getRangeMinutes(selectableRange, hours)
    })

    return {
      hours,
      minutes,
      seconds,
      hoursList,
      minutesList
    }
  }
})
</script>
