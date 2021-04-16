<template>
  <div class="home">
    <h1>Exercice 1 : Déclaration de fonction</h1>
    <h2>
      Crée une fonction nommée <code>greet</code> qui renvoie la chaîne de caractères <code>"Hello world!"</code>
    </h2>
    <MonacoEditor
      v-model="code"
      class="editor"
      language="javascript"
      theme="vs-dark"
    />
    <div class="text-center">
      <button
        class="btn"
        @click="evaluate"
      >
        Passer le test
      </button>
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
import MonacoEditor from '@/components/MonacoEditor'

import {
  getRightFeedback,
  getWrongFeedback,
  getErrorFeedback,
} from '../utils/index.js'

export default {
  name: 'Home',

  components: {
    MonacoEditor,
  },

  data () {
    return {
      code: 'function () {\n  \n}',
      editor: undefined,
      value: '',
      intro: '',
      result: '',
      resultClass: '',
      error: '',
    }
  },

  methods: {
    async evaluate () {
      this.intro = ''
      this.result = ''
      this.resultClass = ''
      this.error = ''
      const checkCode = await fetch('/raw.js').then(res => res.text())
      try {
        const returnValue = eval(this.code + ';' + checkCode) // eslint-disable-line
        if (returnValue) {
          this.result = getRightFeedback()
          this.resultClass = 'text-green'
        } else {
          this.resultClass = 'text-orange'
          this.result = getWrongFeedback()
        }
      } catch (error) {
        this.intro = getErrorFeedback()
        this.error = error.message
      }
    },
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

.btn {
  font-weight: 600;
  background-color: var(--ok-color);
  color: var(--almost-white);
  padding: 1em;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  margin: 1em;
  cursor: pointer;
}
</style>
