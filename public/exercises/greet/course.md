## Les fonctions

### Déclaration de fonction

En JavaScript, il existe plusieurs manières de créer des fonctions. Nous allons d'abord voir la **déclaration de fonction**.

Elle se fait avec le mot clé **`function`**, suivi du nom de fonction qui doit être un identifiant valide, c'est-à-dire qu'il doit commencer par une lettre ou souligné `_` (*underscore* ou *underline* en anglais) ou quelques signes comme le dollar `$`, et ne pas contenir de caractères spéciaux, à part ces même signes. Le nom peut contenir des chiffres.

### Déclaration la plus simple

Voici la déclaration la plus simple d'une fonction :

```javascript
function noop () {}
```

Son nom est `noop` et ne prend aucun argument, et ne renvoie rien, c'est-à-dire, en JavaScript, qu'elle renvoie la valeur `undefined` (cf. les primitives en JavaScript).

### Retour de la fonction

Pour que la fonction renvoie une valeur, il faut utiliser le mot-clé `return`. Si l'exécution du code passe par une instruction contenant `return`, ce sera forcément la dernière instruction de la fonction.

```javascript
function giveMeNull () {
    return null
}
```

Cette fonction s'appelle `giveMeNull` et renvoie la valeur `null`.

### Les paramètres (et arguments)

Une fonction peut attendre des **paramètres**. Si c'est le cas, ils sont ajoutés dans la **signature de la fonction** dans les parenthèses.

```javascript
function identity (x) { // Cette ligne forme la signature de la fonction
    return x
}
```

Cette fonction s'appelle `identity` et renvoie l'argument passé à la fonction. On dit qu'une fonction attend des paramètres dans sa définition, et lors d'un appel de la fonction, on lui passe des **arguments**. (C'est une nuance qui n'est jamais très importante).

Si la fonction en attend plusieurs, ils doivent être séparés par des virgules `,`.

```javascript
function addOrConcat (a, b) {
    return a + b
}
```
