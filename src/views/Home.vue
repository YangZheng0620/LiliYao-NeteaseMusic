<template>
  <div class="home">
    <nav-header></nav-header>
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <router-view></router-view>
    <login></login>

  </div>
</template>

<script>
// @ is an alias to /src
import NavHeader from "@/components/NavHeader";
import Login from "@/components/Login";

export default {
  name: 'Home',
  components: {
    NavHeader,
    Login,
  },

}
</script>
