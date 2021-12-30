<template>
  <div class="q-pa-md q-gutter-sm catalogsDiv">
    <div class="">
      <q-table
        class="box-shadow catalogs-table"
        title="Catalogs"
        title-class="text-h6 primary-text"
        :rows="rows"
        :columns="columns"
        :filter="filter"
        row-key="name"
        no-data-label="I didn't find anything for you"
        no-results-label="The filter didn't uncover any results"
      >
        <template v-slot:top-right>
          <q-input
            style="min-width: 300px"
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:header-cell="props">
          <q-th :props="props">
            {{ props.col.label }}
            <q-btn-dropdown
              size="xs"
              unelevated
              flat
              padding="6px"
              dropdown-icon="mdi-filter"
            >
              <colFilter></colFilter>
            </q-btn-dropdown>
          </q-th>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="img" :props="props">
              {{ props.row.img }}
            </q-td>
            <q-td key="catalogName" :props="props">
              {{ props.row.catalogName }}
            </q-td>
            <q-td key="noOfProduct" :props="props">
              {{ props.row.noOfProduct }}
            </q-td>
            <q-td key="feedUpdated" :props="props">
              {{ props.row.feedUpdated }}
            </q-td>
            <q-td key="inventoryUpdated" :props="props">
              {{ props.row.inventoryUpdated }}
            </q-td>
            <q-td key="newFeedAvailable" :props="props">
              <q-badge
                style="height: 25px; width: 40px; justify-content: center"
                :color="getColor(props.row.newFeedAvailable)"
                :label="getLabel(props.row.newFeedAvailable)"
                :text-color="getTextColor(props.row.newFeedAvailable)"
              ></q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  components: {
    colFilter: require("src/components/restate/filter/filter.vue").default,
  },
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    onBeforeMount(() => {
      $store.dispatch("home/getCatalogDetails");
    });

    return {
      filter: ref(""),
      columns: computed(() => $store.getters["home/getCatalogsTableColumns"]),
      rows: computed(() => $store.getters["home/getCatalogsTableRows"]),
      //Methods
      getColor: (value) => (value ? "light-green-2" : "red-2"),
      getLabel: (value) => (value ? "Yes" : "No"),
      getTextColor: (value) => (value ? "green-10" : "red-10"),
    };
  },
};
</script>