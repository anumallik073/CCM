<template>
  <div class="q-pa-md filter-div">
    <div class="">
      <q-form @submit="onSubmit" @reset="onReset" class="q-mt-xs q-gutter-md">
        <q-select
          outlined
          dense
          v-model="model"
          :options="options"
          label="Filter Type"
        />
        <q-input dense outlined v-model="text" label="Filter..." />
        <div class="row justify-between">
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn label="Apply" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();
    return {
      model: ref(null),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
};
</script>
<style lang="scss" scoped>

</style>