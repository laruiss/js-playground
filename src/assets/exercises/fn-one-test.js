test('greet() doit renvoyer `Hello world!`', t => {
  const actual = greet()
  const expected = 'Hello world!'
  t.equal(typeof actual, 'string', `Devrait renvoyer une string`)
  t.equal(actual, expected, `Devrait renvoyer ${expected} au lieu de ${actual}`)
})
