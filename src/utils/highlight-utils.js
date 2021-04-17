import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

/*
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', xml)
*/

let jsRegistered = false

export const highlightJsInEl = (el) => {
  if (!jsRegistered) {
    hljs.registerLanguage('javascript', javascript)
    jsRegistered = true
  }

  [...el.value.querySelectorAll('code.language-javascript')]
    .forEach(block => hljs.highlightBlock(block))
}
