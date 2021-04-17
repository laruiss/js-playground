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
      v-if="showCourse"
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
            {{ result }}
          </b>
          <em class="text-red">
            {{ error }}
          </em>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BasicButton from './BasicButton.vue'
import { computed, ref } from '@vue/runtime-core'
import MonacoEditor from '@/components/MonacoEditor'

import {
  getRightFeedback,
  getWrongFeedback,
  getErrorFeedback,
} from '../utils/index.js'

import { createHarness } from 'zora'
import { indentedTapReporter } from 'zora-tap-reporter'

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
    const code = ref(props.initialCode)
    const testCode = ref(props.testCode)
    const intro = ref('')
    const result = ref('')
    const resultClass = ref('')
    const error = ref('')

    const resetResultData = () => {
      intro.value = ''
      result.value = ''
      resultClass.value = ''
      error.value = ''
    }

    const showCourse = ref(false)
    const toggleCourse = () => { showCourse.value = !showCourse.value }
    const btnText = computed(() => (`${showCourse.value ? 'Cacher' : 'Afficher'} les rappels de cours`))

    const evaluate = async () => {
      resetResultData()

      const harness = createHarness()
      const { test } = harness // eslint-disable-line no-unused-vars

      try {
        eval(code.value + ';' + testCode.value) // eslint-disable-line no-eval
      } catch (err) {
        intro.value = getErrorFeedback()
        error.value = err.message
        return
      }

      harness.report(indentedTapReporter()).then(() => {
        // reporting is over: we can release some pending resources
        console.log('Done!')
        // or in this case, our test program is for node so we want to set the exit code ourselves in case of failing test.
        if (harness.pass) {
          result.value = getRightFeedback()
          resultClass.value = 'text-green'
        } else {
          resultClass.value = 'text-orange'
          result.value = getWrongFeedback()
        }
      })
    }

    return {
      btnText,
      code,
      intro,
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

<style scoped>
.editor {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
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
