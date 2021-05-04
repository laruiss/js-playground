'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const map = (fn) => async function * (stream) {
  for await (const m of stream) {
    yield fn(m)
  }
}
// ! it mutates the underlying structure yet it is more efficient regarding performances
const flatten = map((m) => {
  m.offset = 0
  return m
})
const isAssertionResult = (result) => {
  return 'operator' in result
}
const stringifySymbol = (key, value) => {
  if (typeof value === 'symbol') {
    return value.toString()
  }
  return value
}

// @ts-ignore
const flatDiagnostic = ({ pass, description, ...rest }) => rest
const Tap = {
  print (message, offset = 0) {
    this.log(message.padStart(message.length + (offset * 4))) // 4 white space used as indent (see tap-parser)
  },
  printYAML (obj, offset = 0) {
    const YAMLOffset = offset + 0.5
    this.print('---', YAMLOffset)
    for (const [prop, value] of Object.entries(obj)) {
      this.print(`${prop}: ${JSON.stringify(value, stringifySymbol)}`, YAMLOffset + 0.5)
    }
    this.print('...', YAMLOffset)
  },
  printComment (comment, offset = 0) {
    this.print(`# ${comment}`, offset)
  },
  printBailOut (message) {
    this.print('Bail out! Unhandled error.')
  },
  printTestStart (message) {
    const { data: { description }, offset } = message
    this.printComment(description, offset)
  },
  printTestEnd (message) {
    // do nothing
  },
  printAssertion (message) {
    const { data, offset } = message
    const { pass, description } = data
    const label = pass === true ? 'ok' : 'not ok'
    if (isAssertionResult(data)) {
      const id = this.nextId()
      this.print(`${label} ${id} - ${description}`, offset)
      if (pass === false) {
        this.printYAML(flatDiagnostic(data), offset)
      }
    } else if (data.skip) {
      const id = this.nextId()
      this.print(`${pass ? 'ok' : 'not ok'} ${id} - ${description} # SKIP`, offset)
    }
  },
  printSummary (endMessage) {
    this.print('', 0)
    this.printComment(endMessage.data.pass ? 'ok' : 'not ok', 0)
    this.printComment(`success: ${endMessage.data.successCount}`, 0)
    this.printComment(`skipped: ${endMessage.data.skipCount}`, 0)
    this.printComment(`failure: ${endMessage.data.failureCount}`, 0)
  },
  async report (stream) {
    const src = flatten(stream)
    let lastMessage = null
    this.print('TAP version 13')
    for await (const message of src) {
      lastMessage = message
      switch (message.type) {
        case 'TEST_START' /* TEST_START */:
          this.printTestStart(message)
          break
        case 'ASSERTION' /* ASSERTION */:
          this.printAssertion(message)
          break
        case 'BAIL_OUT' /* BAIL_OUT */:
          this.printBailOut(message)
          throw message.data
      }
    }
    this.print(`1..${lastMessage.data.count}`, 0)
    this.printSummary(lastMessage)
  },
}
const factory = (log) => {
  let i = 0
  return Object.create(Tap, {
    nextId: {
      enumerable: true,
      value: () => {
        return ++i
      },
    },
    log: { value: log },
  })
}

const report = (factory) => (logger = console) => {
  const log = logger.log.bind(logger)
  return async (stream) => factory(log).report(stream)
}
const tapReporter = report(factory)

export const myReporter = tapReporter
