<template>
  <div
    class="home"
  >
    <h1>JavaScript</h1>

    <h2>Partie 1 : Les fonctions</h2>

    <app-exercise
      v-if="ready"
      :initial-code="initialCode"
      :test-code="testCode"
      title="Les fonctions"
      :html-course="course"
      :statement="statement"
    />

    <p
      v-if="unknownExercise"
      class="error"
    >
      Exercice introuvable...
    </p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import AppExercise from '@/components/AppExercise.vue'
import { getMarkdownParser } from '@/utils/md-utils'

const parseMd = getMarkdownParser()

export default {
  name: 'ExercisePage',

  components: {
    AppExercise,
  },

  props: {
    exercise: {
      type: String,
      default: '',
    },
  },

  setup () {
    const exo = useRoute().params.exercise
    const unknownExercise = ref(false)
    const ready = ref(false)
    const testCode = ref(undefined)
    const initialCode = ref(undefined)
    const course = ref(undefined)
    const statement = ref(undefined)

    Promise.all(
      [
        'test.js',
        'init.js',
        'course.md',
        'statement.md',
      ]
        .map(
          part => fetch(`/exercises/${exo}/${part}`)
            .then(res => {
              if (res.status === 404) {
                throw new Error('UNKNOWN_EXERCISE')
              }
              return res
            })
            .then(res => res.text()),
        ),
    ).then(([testCodeRaw, initialCodeRaw, courseRaw, statementRaw]) => {
      testCode.value = testCodeRaw
      initialCode.value = initialCodeRaw
      course.value = parseMd(courseRaw)
      statement.value = parseMd(statementRaw)
      ready.value = true
    }).catch(err => {
      if (err.message === 'UNKNOWN_EXERCISE') {
        unknownExercise.value = true
      }
    })

    return ({
      ready,
      course,
      initialCode,
      statement,
      testCode,
      unknownExercise,
    })
  },
}

</script>

<style scoped>
.flex-w-1\/2 {
  flex-basis: 34%;
  flex-grow: 1;
}

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
