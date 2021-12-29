<template>
  <div class="home">
    <nav-header></nav-header>
    <img alt="Vue logo" src="../assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import NavHeader from "@/components/NavHeader";

export default {
  name: 'Home',
  components: {
    NavHeader,
    HelloWorld,
  }
}
</script>
