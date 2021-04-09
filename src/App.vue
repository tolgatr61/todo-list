<template>
  <div id="nav">
    <router-link to="/">Accueil</router-link> |
    <router-link to="/login">Compte</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

body {
  color:black;
}

#nav {
  text-align : center;
  font-size : 32px;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #051923;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
}

</style>


