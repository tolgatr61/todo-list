<template>
  <div class="login">
    <h1> Page de compte </h1>
    <account></account>
  </div>
</template>

<script>
import Account from "@/components/Account";

export default {
  name: "Login",
  components : {
    Account
  }
}
</script>

<style scoped>

h1 {
  text-align : center;
  color : white;
}

</style>