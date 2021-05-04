<template>
  <div class="exercize">
    <h3>{{ title }}</h3>

    <h4>
      <slot name="goal" />
    </h4>

    <h4
      v-html="statement"
    />

    <basic-button
      :text="btnText"
      secondary
      @click.prevent="toggleCourse"
    />

    <div
      v-show="showCourse"
      ref="courseEl"
      v-html="htmlCourse"
    />

    <basic-button
      v-if="showCourse"
      :text="btnText"
      secondary
      @click.prevent="toggleCourse"
    />

    <div class="flex">
      <div class="u-flex-w-1/2  mx-1">
        <p>
          Votre code :
        </p>
        <MonacoEditor
          v-model="code"
          class="editor"
          language="javascript"
          theme="vs"
        />
      </div>
      <div class="u-flex-w-1/2  mx-1">
        <p>Doit passer ce test :</p>
        <MonacoEditor
          :model-value="testCode"
          class="editor"
          language="javascript"
          theme="vs-dark"
          :read-only="true"
        />
      </div>
    </div>
    <div class="text-center  my-2">
      <basic-button
        class="btn"
        text="Passer le test"
        @click.prevent="evaluate"
      />
      <div class="result">
        <p>
          {{ intro }}
        </p>
        <p>
          <b :class="resultClass">
            {{ resultFeedback }}
          </b>
          <em class="text-red">
            {{ error }}
          </em>
        </p>
      </div>
    </div>
    <div
      v-show="report"
      id="report"
      :class="['report', result ? 'success' : 'error']"
    >
      <pre>{{ report }}</pre>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import VueScrollTo from 'vue-scrollto'

import { highlightJsInEl, testReport } from '@/utils/index.js'

import BasicButton from '@/components/BasicButton.vue'
import MonacoEditor from '@/components/MonacoEditor'

export default {
  name: 'AppExercize',

  components: {
    BasicButton,
    MonacoEditor,
  },

  props: {
    initialCode: {
      type: String,
      default: '',
    },
    testCode: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Titre',
    },
    htmlCourse: {
      type: String,
      default: '',
    },
    statement: {
      type: String,
      default: '',
    },
  },

  setup (props) {
    const router = useRouter()
    const code = ref(props.initialCode)
    const intro = ref('')
    const result = ref(undefined)
    const resultClass = ref('')
    const resultFeedback = ref('')
    const error = ref('')
    const courseEl = ref(null)

    const resetResultData = () => {
      intro.value = ''
      report.value = ''
      result.value = undefined
      resultClass.value = ''
      resultFeedback.value = ''
      error.value = ''
    }

    const showCourse = ref(false)
    const toggleCourse = () => { showCourse.value = !showCourse.value }
    const btnText = computed(() => (`${showCourse.value ? 'Cacher' : 'Afficher'} les rappels de cours`))

    watch(showCourse, async (show) => {
      if (show) {
        highlightJsInEl(courseEl.value)
      }
    })

    const report = ref('')

    const evaluate = async () => {
      resetResultData()

      const testResult = await testReport(code.value, props.testCode)
      resultFeedback.value = testResult.feedback
      intro.value = testResult.intro
      error.value = testResult.error
      result.value = testResult.result
      report.value = testResult.report

      resultClass.value = result.value ? 'text-green' : 'text-red'

      await nextTick()
      router.push({ hash: '#report' })
      VueScrollTo.scrollTo('#report')
    }

    return {
      btnText,
      code,
      courseEl,
      intro,
      report,
      result,
      resultClass,
      error,
      showCourse,
      toggleCourse,
      evaluate,
    }
  },
}
</script>

<style scoped lang="postcss">
.editor {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
}

.report {
  @apply border  rounded  p-4;

  &.error {
    @apply border-red-500  bg-red-100  text-red-800;
  }

  &.success {
    @apply border-green-500  bg-green-100  text-green-800;
  }
}

.text-red {
  font-weight: bold;
  color: #fa5555;
}

.text-orange {
  color: #fa9933;
}

.text-green {
  font-weight: bold;
  color: #55ee55;
}

.text-center {
  text-align: center;
}
</style>
