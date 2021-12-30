<template>
  <q-layout view="hHh lpR fFf">
    <q-btn
      label="Manage Subscriptions"
      icon="mdi-note-plus"
      color="primary"
      class=""
      to="/products/subscriptions"
    />
    <div class="q-py-md">
      <div class="q-gutter-y-md">
        <q-tabs
          v-model="tab"
          narrow-indicator
          dense
          align="justify"
          active-color="primary"
          indicator-color="primary"
          class="text-color box-shadow"
          style="max-width: 500px"
        >
          <q-tab
            :ripple="{ color: 'primary' }"
            name="suppliers"
            label="Suppliers"
            class="q-py-sm"
          />
          <q-separator vertical inset />
          <q-tab
            :ripple="{ color: 'primary' }"
            name="history"
            label="History"
            class="q-py-sm"
          />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="suppliers">
            <suppliers />
          </q-tab-panel>
          <q-tab-panel name="history">
            <history />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { ref } from "vue";
export default {
  components: {
    suppliers:
      require("src/components/features/products/suppliers/suppliers.vue")
        .default,
    history: require("src/components/features/products/history/history.vue")
      .default,
  },
  setup() {
    return {
      tab: ref("suppliers"),
    };
  },
};
</script>

<style>
</style>