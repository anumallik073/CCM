<template>
  <div class="q-pa-md q-gutter-sm settingsDiv">
    <div class="">
      <q-table :rows="rows" :columns="columns" row-key="name" binary-state-sort>
        <template v-slot:top>
          <div class="text-h5">Users</div>
          <q-space />
          <div class="create-user-div">
            <q-btn
              label="Create User"
              icon="mdi-account-plus"
              color="primary"
              class=""
              @click="prompt = true"
            />
            <q-dialog v-model="prompt" @hide="onDialogHide">
              <user-popup />
            </q-dialog>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="userName" :props="props">
              {{ props.row.userName }}
              <q-popup-edit
                v-model="props.row.userName"
                title="Update username"
                buttons
                @save="
                  (v, i) => {
                    sav(v, i, props.row, 'userName');
                  }
                "
                @cancel="
                  (v, i) => {
                    cancelled(v, i, props.row, 'userName');
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
            <q-td key="name" :props="props">
              {{ props.row.name }}
              <q-popup-edit 
                v-model="props.row.name"
                title="Update name"
                buttons
                 @save="(v,i) => { sav(v, i, props.row, 'name'); }"
                 @cancel="(v,i) => { cancelled(v, i, props.row, 'name'); }"
                v-slot="scope"
              >
                <q-input
                 type="text" 
                  v-model="scope.value"
                  dense autofocus @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
              <q-popup-edit
                v-model="props.row.email"
                title="Update email"
                @save="
                  (v, i) => {
                    sav(v, i, props.row, 'email');
                  }
                "
                @cancel="
                  (v, i) => {
                    cancelled(v, i, props.row, 'email');
                  }
                "
                v-slot="scope"
                buttons
              >
                <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="role" :props="props">
              <div class="text-pre-wrap">{{ props.row.roleId }}</div>
              <q-popup-edit
                v-model="props.row.roleId"
                title="Update Role"
                @save="
                  (v, i) => {
                    sav(v, i, props.row, 'role');
                  }
                "
                @cancel="
                  (v, i) => {
                    cancelled(v, i, props.row, 'role');
                  }
                "
                v-slot="scope"
                buttons
              >
                <q-select
                  v-model="scope.value"
                  :options="roleOptions"
                  option-label = "name"
                  option-value = "id"
                  stack-label
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status ? "Active" : "Inactive" }}
            </q-td>           
            <q-td key="delete" :props="props">
              <q-btn
                color="primary"
                icon-right="delete_forever"
                no-caps
                @click="deleteRow(props.row.id)"
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
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const rows = ref(null);
    const roleOptions = ref(null);
    onBeforeMount(() => {
        $store.dispatch('common/getUsers')        
        $store.dispatch('common/getRoles')        
      })
    onMounted(() => {
        console.log(rows)
        console.log(roleOptions)
    })
    return {
      prompt: ref(false),
      columns:  computed(()=> $store.getters['common/getUserCols']),
      rows:  computed(()=> $store.getters['common/getUserRows']),
      role: $store.state.common.usersTableData.roleOptions[0],
      roleOptions: computed(()=> $store.getters['common/getRoleOptions']),
      //Methods
      deleteRow(id) {
        $q.dialog({
          title: "Delete",
          message: "Are you sure you want to delete the user?",
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            // console.log('>>>> OK')
            $store.dispatch("auth/addTab", id);
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
      onDialogHide() {
        this.prompt = false;
      },
      sav(val, initVal, data, colname) {
        debugger;
        data[colname] = val;
        let updateData = {
          // Row: data,
          "id": data.id,
          "name": data.name,
          "userName": data.userName,
          "password": data.password,
          "email": data.email,
          "roleId": data.roleId,
          "gender": data.gender,
          "createdDate": data.createdDate,
          "dateOfBirth": data.dateOfBirth,
          "phone": data.phone,
          "userType": data.userType,
          "registeredIP": data.registeredIP,
          "status": data.status,
          "deleted": data.deleted
        };
        updateData[colname] = val
        
        $store
          .dispatch("common/updateUser", updateData)
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
          .catch(() => {
            
          });
      },
      cancelled(val, initVal, data, colname) {
        console.log("cancelled", initVal);
      },
    };
  },
  components: {
    "user-popup":
      require("src/components/features/settings/users/addUsersPopup.vue")
        .default,
  },
};
</script>