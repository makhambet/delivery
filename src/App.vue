<template>
  <div id="app">
    <div id="nav">
      <app-header></app-header>
      <transition class="bottom-body" name="fade">
        <router-view class="bottom-body"></router-view>
      </transition>
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
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  }
</script>
<style>
</style>
