<template>
  <div class="col-full text-center">
    <h2>404 - Not Found</h2>
    <router-link :to="{name: 'Home'}">Read some cool threads</router-link>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style scoped>
</style>
