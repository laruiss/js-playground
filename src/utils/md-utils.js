import { Remarkable } from 'remarkable'

export const getMarkdownParser = (options = {}) => {
  const md = new Remarkable(options)
  return markdown => md.render(markdown)
}
