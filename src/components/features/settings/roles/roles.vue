
<template>
  <div class="q-pa-md q-gutter-sm settingsDiv">
    <div class="">
      <q-table :rows="rows" :columns="columns" row-key="name" binary-state-sort>
        <template v-slot:top>
          <div class="text-h5">Roles</div>
          <q-space />
          <div class="create-role-div">
            <q-btn
              label="Create Role"
              icon="mdi-account-plus"
              color="primary"
              class=""
              @click="openRole"
            />
            <q-dialog v-model="openModal">
              <role-popup />
            </q-dialog>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.name }}
              <q-popup-edit
                v-model="props.row.name"
                title="Update Role Name"
                buttons
                @save="
                  (v, i) => {
                    sav(v, i, props.row, 'name');
                  }
                "
                @cancel="
                  (v, i) => {
                    cancelled(v, i, props.row, 'name');
                  }
                "
                v-slot="scope"
              >
                <q-input
                  type="text"
                  v-model="scope.value"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="selectedPages" :props="props">
              {{
                props.row.selectedPages
              }}
              <q-popup-edit
                v-model="props.row.selectedPages"
                title="Update Pages Accessible"
                buttons
                @save="
                  (v, i) => {
                    sav(v, i, props.row, 'selectedPages');
                  }
                "
                @cancel="
                  (v, i) => {
                    cancelled(v, i, props.row, 'selectedPages');
                  }
                "
                v-slot="scope"
              >
                <q-select
                  v-model="scope.value"
                  multiple
                  :options="options"
                  use-chips
                  stack-label
                  option-label="ModuleName"
                  option-value="pageId"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
             <q-td key="createdBy" :props="props">
              {{ props.row.createdBy }}
              
            </q-td>
            <q-td key="status" :props="props">
              <div class="text-pre-wrap">
                {{ props.row.status ? "Active" : "Inactive" }}
              </div>
              <q-popup-edit
                v-model="props.row.status"
                title="Update Status"
                @save="
                  (v, i) => {
                    sav(v, i, props.row, 'status');
                  }
                "
                @cancel="
                  (v, i) => {
                    cancelled(v, i, props.row, 'status');
                  }
                "
                v-slot="scope"
                buttons
              >
                <q-select
                  v-model="scope.value"
                  :options="statusOptions"
                  label="Standard"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="deleted" :props="props">
              <q-btn
                color="primary"
                icon-right="delete_forever"
                no-caps
                @click="deleteRow(props.row)"
              />
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
import { useQuasar,useDialogPluginComponent } from "quasar"; 

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const openModal = ref(false);
    const { onDi } = useDialogPluginComponent();
     onBeforeMount(() => {
        $store.dispatch('common/getRoles')   
        $store.dispatch('common/getPages')     
      });
    return {
      openModal,
      columns: computed(()=> $store.getters['common/getRoleCol']),
      rows: computed(()=> $store.getters['common/getRoleOptions']),
      role: $store.state.common.usersTableData.roleOptions[0],
      options: computed(()=> $store.getters['common/getPages']),
      statusOptions: ["Active", "Inactive"],
      pages: computed(()=> $store.getters['common/getPages']),
      status: ref("Active"),
      openRole(){
      $store.dispatch('common/getPages')
      openModal.value = true
      },
      //Methods
      deleteRow(row) {
         $q.dialog({
          title: "Delete",
          message: "Are you sure you want to delete the role?",
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            // console.log('>>>> OK')
            // $store.dispatch("common/updateRole", id);
            this.sav(true, '', row, 'deleted');
          })
          .onOk(() => {
            // console.log('>>>> second OK catcher')
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      },
      sav(val, initVal, data, colname) {
        let pages = [];
        if (colname == "status") {
          data[colname] = val && val == "Active" ? true : false;
        } 
        else if(colname == "selectedPages"){
           val.map(val=>{
              pages.push(val.PageId)
            })
           data[colname] = pages.toString();
        }else {
          data[colname] = val;
        }
        let updateData =  data
      //   {
      //    id: 0,
      //    name : roleName.value,
      //   //  deleted : status.value,
      //    code: '',
      //    roleType: 1,
      //    createdBy: 31,
      //    selectedPages : pages.toString(),
      //    deleted : false
      //  }
        $store
          .dispatch("common/updateRole", updateData)
          .then((response) => {
            if (response == "error") {
              $q.notify({
                color: "negative",
                position: "top",
                message: "Add User Failed",
                icon: "report_problem",
              });
              return;
            }
          })
          .catch(() => {});
      },
      cancelled(val, initVal, data, colname) {
        console.log("cancelled", initVal);
      },
    };
  },
  components: {
    "role-popup":
      require("src/components/features/settings/roles/addRolesPopup.vue")
        .default,
  },
};
</script>