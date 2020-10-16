<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        Exo 1
      </router-link> |
      <router-link to="/about">
        Exo 2
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

h1,
#nav {
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
