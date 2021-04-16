import { h } from 'vue'
import assign from 'nano-assign'

export default {
  name: 'MonacoEditor',

  props: {
    original: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
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
    diffEditor: Boolean,
  },

  emits: ['editorWillMount', 'update:modelValue', 'editorDidMount'],

  watch: {
    options: {
      deep: true,
      handler (options) {
        if (this.editor) {
          const editor = this.getModifiedEditor()
          editor.updateOptions(options)
        }
      },
    },

    modelValue (newValue) {
      if (this.editor) {
        const editor = this.getModifiedEditor()
        if (newValue !== editor.getValue()) {
          editor.setValue(newValue)
        }
      }
    },

    original (newValue) {
      if (this.editor && this.diffEditor) {
        const editor = this.getOriginalEditor()
        if (newValue !== editor.getValue()) {
          editor.setValue(newValue)
        }
      }
    },

    language (newVal) {
      if (this.editor) {
        const editor = this.getModifiedEditor()
        this.monaco.editor.setModelLanguage(editor.getModel(), newVal)
      }
    },

    theme (newVal) {
      if (this.editor) {
        this.monaco.editor.setTheme(newVal)
      }
    },
  },

  async mounted () {
    const monaco = await import('monaco-editor')
    this.monaco = monaco
    this.$nextTick(() => {
      this.initMonaco(monaco)
    })
  },

  beforeUnmount () {
    this.editor && this.editor.dispose()
  },

  methods: {
    initMonaco (monaco) {
      this.$emit('editorWillMount', this.monaco)

      const options = assign(
        {
          value: this.modelValue,
          theme: this.theme,
          language: this.language,
        },
        this.options,
      )

      if (this.diffEditor) {
        this.editor = monaco.editor.createDiffEditor(this.$refs.root, options)
        const originalModel = monaco.editor.createModel(
          this.original,
          this.language,
        )
        const modifiedModel = monaco.editor.createModel(
          this.modelValue,
          this.language,
        )
        this.editor.setModel({
          original: originalModel,
          modified: modifiedModel,
        })
      } else {
        this.editor = monaco.editor.create(this.$refs.root, options)
      }

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

    getModifiedEditor () {
      return this.diffEditor ? this.editor.getModifiedEditor() : this.editor
    },

    getOriginalEditor () {
      return this.diffEditor ? this.editor.getOriginalEditor() : this.editor
    },

    focus () {
      this.editor.focus()
    },
  },

  setup () {
    return () => h('div', { class: 'MonacoEditor', ref: 'root' })
  },
}
