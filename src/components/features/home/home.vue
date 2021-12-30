<template>
  <div class="q-pa-md q-gutter-y-md background-color">
    <overview></overview>
    <catalogs></catalogs>
  </div>
</template>
<script>
export default {
  components: {
    overview: require("src/components/features/home/overview/overview.vue")
      .default,
    catalogs: require("src/components/features/home/catalogs/catalogs.vue")
      .default,
  },
};
</script>

<style lang="scss" scoped>
.overview-num {
  font-weight: bolder;
  font-size: 20px;
}
.overview-text {
  font-size: 14px;
}
</style>