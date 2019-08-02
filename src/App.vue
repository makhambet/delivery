<template>
  <div id="app">
    <div id="nav">
      <app-header></app-header>
      <router-view></router-view>
      </div>
      <app-aside></app-aside>
      <app-footer></app-footer>
  </div>
</template>
<script>
  import AppHeader from '@/components/Header'
  import AppFooter from '@/components/Footer'
  import AppAside from '@/components/Aside'
  export default {
    components: {
      AppHeader,
      AppAside,
      AppFooter
    },
  }
</script>
<style>
</style>
