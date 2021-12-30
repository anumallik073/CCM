<template>
  <div class="q-pa-md q-gutter-sm catalogsDiv">
    <div class="">
      <q-table
        title="Catalogs"
        :rows="rows"
        :columns="columns"
        :filter="filter"
        row-key="name"
        no-data-label="I didn't find anything for you"
        no-results-label="The filter didn't uncover any results"
        binary-state-sort
      >
        <template v-slot:top-right>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
            style="min-width: 300px;"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="supplier" :props="props">
              {{ props.row.supplier }}
            </q-td>
            <q-td key="filename" :props="props">
              {{ props.row.filename }}
            </q-td>
            <q-td key="date" :props="props">
              {{ props.row.date }}
            </q-td>
            <q-td key="rows" :props="props">
              {{ props.row.rows }}
            </q-td>
            <q-td key="connection" :props="props">
              {{ props.row.connection }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();
    return {
      filter: ref(""),
      columns: computed(
        () => $store.getters["products/getHistoryTableColumns"]
      ),
      rows: computed(() => $store.getters["products/getHistoryTableRows"]),
      //Methods
    };
  },
};
</script>