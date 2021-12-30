<template>
  <q-card style="width: 700px; max-width: 80vw">
    <q-card-section class="q-ml-md">
      <div class="text-h6 text-uppercase">Add role</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
        <div class="row q-gutter-md q-pb-sm items-center">
        <q-input
        filled
        v-model="roleName"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
          <q-select
            label="Status"
            transition-show="flip-up"
            transition-hide="flip-down"
            filled
            v-model="status"
            :options="statusOptions"
            class="col-sm"
          />
        </div>

        <div class="row q-gutter-md q-pb-sm items-center">
          <q-select
            filled
            v-model="modelMultiple"
            multiple
            :options="options"
            use-chips
            stack-label
            option-label="ModuleName"
            option-value="pageId"
            label="Pages Accessible"
            class="col-sm"
          />
        </div>
        <div align="right" class="text-primary">
         <q-btn label="Submit" type="submit" color="primary"/>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<style lang="scss" scoped>
.q-field--with-bottom {
  padding-bottom: 0px;
}
</style>
<script>
import { ref, computed } from "vue";
import { useStore } from 'vuex'
import { useFormChild, useQuasar } from 'quasar'


export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const roleName = ref(null);
    const status = ref("Active")
    const modelMultiple = ref(null)
    return {
      roleName,
      status,
      statusOptions: ["Active", "Inactive"],
      modelMultiple,
      options: computed(()=> $store.getters['common/getPages']),
      onSubmit ($event) {
        console.log(modelMultiple)
        console.log(status)
        console.log(roleName)
        let pages = [];
       if(modelMultiple.value == null){
            $q.notify({
            color: 'warning',
            position: 'top',
            message: 'Select Pages',
            })
            return;
       }
       modelMultiple.value = modelMultiple.value.map(val=>{
         pages.push(val.PageId)
       })
       let roleData = {
         id: 0,
         name : roleName.value,
        //  deleted : status.value,
         code: '',
         roleType: 1,
         createdBy: 31,
         selectedPages : pages.toString(),
         deleted : false
       }

       $store.dispatch('common/addRole', roleData).then(val=>{
          $q.notify({
            color: 'positive',
            position: 'top',
            message: 'Role Added Successfully',
            })
       })
       .catch(()=>{
            $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Add Role Failed. Try again',
            })
       })
      }
    };
  },
};
</script>