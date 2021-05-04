import { createHarness } from 'zora'
// import { tapReporter } from 'zora-tap-reporter'

import {
  getRightFeedback,
  getWrongFeedback,
  getErrorFeedback,
  myReporter,
} from './index.js'

export const testReport = async (code, testCode) => {
  const harness = createHarness()

  try {
    const { test } = harness // eslint-disable-line no-unused-vars
    eval(code + ';' + testCode) // eslint-disable-line no-eval
  } catch (err) {
    return {
      error: err.message,
      intro: getErrorFeedback(),
    }
  }

  let report = ''
  await harness.report(myReporter({ log (msg) { report += msg + '\n' } }))

  return {
    result: harness.pass,
    feedback: harness.pass ? getRightFeedback() : getWrongFeedback(),
    report,
  }
}
