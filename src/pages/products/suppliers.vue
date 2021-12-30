<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-pt-lg">
      <div class="q-gutter-y-md">
        <div class="q-pr-lg row justify-between items-center">
          <q-tabs
            v-model="tab"
            narrow-indicator
            dense
            align="justify"
            active-color="primary"
            indicator-color="primary"
            class="text-color box-shadow bg-white col"
            style="max-width: 500px"
          >
            <q-tab
              :ripple="{ color: 'primary' }"
              name="suppliers"
              label="Suppliers"
              class="q-py-md"
            />
            <q-separator vertical inset />
            <q-tab
              :ripple="{ color: 'primary' }"
              name="history"
              label="History"
              class="q-py-md"
            />
          </q-tabs>
          <q-btn
            label="Manage Subscriptions"
            icon="mdi-note-plus"
            color="primary"
            class="col-sm-2 box-shadow"
            to="/products/subscriptions"
            style="width:20%; height:50px"
          />
        </div>
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