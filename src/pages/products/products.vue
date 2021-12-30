<template>
  <q-layout view="hHh lpR fFf" class="background-color">
    <q-page-container >
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  components: {
    products: require("src/components/features/products/products.vue").default,
  },
};
</script>

<style>
</style>