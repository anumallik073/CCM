<template>
  <div class="q-gutter-sm settingsDiv ">
    <div class="">      
      <q-table
        title="Suppliers"
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
            borderless
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
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="logo" :props="props">
              {{ props.row.logo }}
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="code" :props="props">
              {{ props.row.code }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="isInventoryAvailable" :props="props">
              <q-badge
                style="height: 25px; width: 40px; justify-content: center"
                :color="getColor(props.row.isInventoryAvailable)"
                :label="getLabel(props.row.isInventoryAvailable)"
                :text-color="getTextColor(props.row.isInventoryAvailable)"
              ></q-badge>
            </q-td>
            <q-td key="isDropshipAvailable" :props="props">
              <q-badge
                style="height: 25px; width: 40px; justify-content: center"
                :color="getColor(props.row.isDropshipAvailable)"
                :label="getLabel(props.row.isDropshipAvailable)"
                :text-color="getTextColor(props.row.isDropshipAvailable)"
              ></q-badge>
            </q-td>
            <q-td key="canDownload" :props="props">
              <q-btn color="primary" icon-right="mdi-file-download" no-caps />
              <q-menu transition-show="scale" transition-hide="scale">
                <div class="q-pa-lg" style="min-width: 250px">
                  <div class="q-gutter-md">
                    <p class="text-h6 text-primary">Download</p>
                    <q-select
                      class="q-pb-sm"
                      filled
                      v-model="downlaodModel"
                      :options="downloadOptions"
                      label="Export as"
                    />
                    <q-btn flat text-color="red-4" label="Cancel" />
                    <q-btn
                      color="primary"
                      label="Export"
                      @click="exportTable"
                    />
                  </div>
                </div>
              </q-menu>
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
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { exportFile, useQuasar } from "quasar";

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    onBeforeMount(() => {
        $store.dispatch('products/getSubscribedSuppliers')
    });
    return {
      filter: ref(""),
      columns: computed(() => $store.state.products.suppliersTableData.columns),
      rows: computed(() => $store.state.products.suppliersTableData.rows),
      downlaodModel: ref(null),
      downloadOptions: computed(
        () => $store.state.products.suppliersTableData.downloadOptions
      ),
      //Methods
      getColor: (value) => (value ? "light-green-2" : "red-2"),
      getLabel: (value) => (value ? "Yes" : "No"),
      getTextColor: (value) => (value ? "green-10" : "red-10"),
      
      // exportTable () {
      //   // naive encoding to csv format
      //   const content = [columns.map(col => wrapCsvValue(col.label))].concat(
      //     rows.map(row => columns.map(col => wrapCsvValue(
      //       typeof col.field === 'function'
      //         ? col.field(row)
      //         : row[ col.field === void 0 ? col.name : col.field ],
      //       col.format
      //     )).join(','))
      //   ).join('\r\n')

      //   const status = exportFile(
      //     'table-export.csv',
      //     content,
      //     'text/csv'
      //   )

      //   if (status !== true) {
      //     $q.notify({
      //       message: 'Browser denied file download...',
      //       color: 'negative',
      //       icon: 'warning'
      //     })
      //   }
      // }
    };
  },
};
</script>