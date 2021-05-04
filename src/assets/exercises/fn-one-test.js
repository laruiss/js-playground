test('greet() doit renvoyer `Hello world!`', t => {
  const actual = greet()
  const expected = 'Hello world!'
  t.equal(typeof actual, 'string', 'Doit renvoyer une string')
  t.equal(actual, expected, `Doit renvoyer ${expected}`)
})
