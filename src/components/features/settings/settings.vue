<template>
  <div class="q-pt-lg background-color">
    <div class="q-gutter-y-md">
      <q-tabs
        v-model="tab"
        narrow-indicator
        dense
        align="justify"
        active-color="primary"
        indicator-color="primary"
        class="text-color box-shadow bg-white"
        style="max-width: 650px"
        active-class=""
      >
        <q-route-tab
          :ripple="{ color: 'primary' }"
          name="users"
          label="Users"
          class="q-py-md"
          to="/settings/users"
        />
        <q-separator vertical inset />
        <q-route-tab
          :ripple="{ color: 'primary' }"
          name="roles"
          label="Roles"
          class="q-py-md"
          to="/settings/roles"
        />
        <q-separator vertical inset />
        <q-route-tab
          :ripple="{ color: 'primary' }"
          name="configuration"
          label="Configuration"
          class="q-py-md"
          to="/settings/configurations"
        />
      </q-tabs>
      <q-tab-panels class="transparent" v-model="tab" animated>
        <q-tab-panel name="users">
          <users></users>
        </q-tab-panel>

        <q-tab-panel name="roles">
          <roles></roles>
        </q-tab-panel>

        <q-tab-panel name="configuration" class="configuration-tabpanel q-px-lg">
          <configurations></configurations>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  components: {
    users: require("src/components/features/settings/users/users.vue").default,
    roles: require("src/components/features/settings/roles/roles.vue").default,
    configurations:
      require("src/components/features/settings/configurations/configurations.vue")
        .default,
  },
  setup() {
    return {
      tab: ref("users"),
    };
  },
};
</script>
<style lang="scss" >
.configuration-tabpanel .q-splitter__panel {
  width: 15% !important;
}
</style>