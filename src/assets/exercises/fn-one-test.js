test('greet() doit renvoyer `Hello world!`', t => {
  const actual = greet()
  const expected = 'Hello world!'
  t.equal(actual, expected, `Devrait renvoyer ${expected} au lieu de ${actual}`)
})
