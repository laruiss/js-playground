<template>
  <div class="home">
    <h1>Oh, un exercice !</h1>
    <h2>
      Crée une fonction nommée <code>greet</code> qui retourne la chaîne de caractères <code>"Hello world!"</code>
    </h2>
    <div
      ref="editor"
      class="editor"
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
import * as monaco from 'monaco-editor'

export default {
  name: 'Home',

  data () {
    return {
      code: 'const noop = () => {}',
      editor: undefined,
      value: '',
      intro: '',
      result: '',
      resultClass: '',
      error: '',
    }
  },

  mounted () {
    const editor = this.editor = monaco.editor.create(this.$refs.editor, {
      value: this.value,
      language: 'javascript',
    })

    editor.onDidChangeModelContent(event => {
      const value = editor.getValue()
      if (this.value !== value) {
        this.value = value
      }
    })
  },

  methods: {
    async evaluate () {
      this.intro = ''
      this.result = ''
      this.resultClass = ''
      this.error = ''
      const checkCode = await fetch('/raw.js').then(res => res.text())
      try {
        const returnValue = eval(this.value + ';' + checkCode) // eslint-disable-line
        if (returnValue) {
          this.result = [
            'Yay, beau-gosse !',
            'Mais tay trop fort !',
            'Super ! On va plus loin ?',
            'Génial ! On continue ?',
          ][4 * Math.random() | 0]
          this.resultClass = 'text-green'
        } else {
          this.resultClass = 'text-orange'
          this.result = [
            'Essaie encore une fois',
            'Mmh, il doit manquer quelque chose...',
            'Tu as tout vérifié ?',
          ][3 * Math.random() | 0]
        }
      } catch (error) {
        this.intro = [
          'Aïe, une erreur a surgi ! La voici :',
          "Oups, je crois que quelqu'un n'est pas content, voici ce qu'il m'a dit :",
          "Mmh, j'ai une mauvaise nouvelle. Je ne sais pas comment te le dire autrement :",
        ][3 * Math.random() | 0] + ' '
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
  background-color: #55ee55;
  padding: 1em;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  margin: 1em;
  cursor: pointer;
}
</style>
