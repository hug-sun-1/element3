<template>
  <div class="el-time-spinner">
    <template v-if="!arrowControl">
      <el-scrollbar
        @mouseenter="emitSelectRange('hours')"
        @mousemove="adjustCurrentSpinner('hours')"
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        ref="hours"
      >
        <li
          @click="handleClick('hours', { value: hour, disabled: disabled })"
          v-for="(disabled, hour) in hoursList"
          class="el-time-spinner__item"
          :key="hour"
          :class="{ active: hour === hours, disabled: disabled }"
        >
          {{ ('0' + (amPmMode ? hour % 12 || 12 : hour)).slice(-2)
          }}{{ amPm(hour) }}
        </li>
      </el-scrollbar>
      <el-scrollbar
        @mouseenter="emitSelectRange('minutes')"
        @mousemove="adjustCurrentSpinner('minutes')"
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        ref="minutes"
      >
        <li
          @click="handleClick('minutes', { value: key, disabled: false })"
          v-for="(enabled, key) in minutesList"
          :key="key"
          class="el-time-spinner__item"
          :class="{ active: key === minutes, disabled: !enabled }"
        >
          {{ ('0' + key).slice(-2) }}
        </li>
      </el-scrollbar>
      <el-scrollbar
        v-show="showSeconds"
        @mouseenter="emitSelectRange('seconds')"
        @mousemove="adjustCurrentSpinner('seconds')"
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        ref="seconds"
      >
        <li
          @click="handleClick('seconds', { value: key, disabled: false })"
          v-for="(second, key) in 60"
          class="el-time-spinner__item"
          :class="{ active: key === seconds }"
          :key="key"
        >
          {{ ('0' + key).slice(-2) }}
        </li>
      </el-scrollbar>
    </template>
    <!-- <template v-if="arrowControl">
      <div
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
        <ul class="el-time-spinner__list" ref="hours">
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
        </ul>
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
        <ul class="el-time-spinner__list" ref="minutes">
          <li
            class="el-time-spinner__item"
            :class="{ active: minute === minutes }"
            v-for="(minute, key) in arrowMinuteList"
            :key="key"
          >
            {{ minute === undefined ? '' : ('0' + minute).slice(-2) }}
          </li>
        </ul>
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
        <ul class="el-time-spinner__list" ref="seconds">
          <li
            v-for="(second, key) in arrowSecondList"
            class="el-time-spinner__item"
            :class="{ active: second === seconds }"
            :key="key"
          >
            {{ second === undefined ? '' : ('0' + second).slice(-2) }}
          </li>
        </ul>
      </div>
    </template> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ElTimeSpinner',
  props: {
    modelValue: [String, Date], // 双向绑定一个时间
    selectableRange: String,
    arrowControl: Boolean
  },
  emits: ['update:modelValue', 'mouse-over']
})
</script>
