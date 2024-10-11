<template>
  <div id="app">
    <postComponents/>
  </div>
</template>

<script>
import PostComponents from './components/PostComponents.vue'

export default {
  name: 'App',
  components: {
    PostComponents
  }
}
</script>
<style scoped>
.app{
  max-width: 1200px;
  margin:0 auto;
  background: red;
}

</style>
