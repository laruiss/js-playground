import { h } from 'vue'
import assign from 'nano-assign'

export default {
  name: 'MonacoEditor',

  props: {
    modelValue: {
      type: String,
      default: '',
    },
    readOnly: Boolean,
    theme: {
      type: String,
      default: 'vs',
    },
    language: {
      type: String,
      default: 'javascript',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },

  emits: ['editorWillMount', 'update:modelValue', 'editorDidMount'],

  watch: {
    options: {
      deep: true,
      handler (options) {
        if (this.editor) {
          this.editor.updateOptions(options)
        }
      },
    },

    modelValue (newValue) {
      if (this.editor) {
        const editor = this.editor
        if (newValue !== editor.getValue()) {
          editor.setValue(newValue)
        }
      }
    },

    original (newValue) {
      if (this.editor && this.diffEditor) {
        const editor = this.editor
        if (newValue !== editor.getValue()) {
          editor.setValue(newValue)
        }
      }
    },

    language (newVal) {
      if (this.editor) {
        this.editor.setModelLanguage(this.editor.getModel(), newVal)
      }
    },

    theme (newVal) {
      if (this.editor) {
        this.editor.setTheme(newVal)
      }
    },
  },

  async mounted () {
    const monaco = await import('monaco-editor')
    this.monaco = monaco
    await this.$nextTick()
    this.initMonaco(monaco)
  },

  beforeUnmount () {
    this.editor && this.editor.dispose()
  },

  methods: {
    initMonaco (monaco) {
      this.$emit('editorWillMount', monaco)

      const options = assign(
        {
          value: this.modelValue,
          theme: this.theme,
          language: this.language,
          readOnly: this.readOnly,
        },
        this.options,
      )

      this.editor = monaco.editor.create(this.$refs.root, options)

      const editor = this.editor

      editor.onDidChangeModelContent(event => {
        const value = editor.getValue()
        if (this.modelValue !== value) {
          this.$emit('update:modelValue', value, event)
        }
      })

      this.$emit('editorDidMount', this.editor)
    },

    getEditor () {
      return this.editor
    },

    focus () {
      this.editor.focus()
    },
  },

  setup () {
    return () => h('div', { class: 'MonacoEditor', ref: 'root' })
  },
}
