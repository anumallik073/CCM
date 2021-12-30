<template>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
    <div class="row q-gutter-md">
        <div class="col">
             <q-input
        square outlined
        v-model="filename"
        label="FileName *"
        hint="File Name"
        lazy-rules
        :rules="[ val => !!val || 'FileName is missing' ]"
      /> 
        </div>
        <div class="col">
            <q-checkbox
          v-model="isdatestamp"
          label="Enable DateTime"
        :rules="[ val => !!val || 'FileName is missing' ]"
        />
        </div>
       
    </div>  
      <div>
       <q-btn label="Submit" class="full-width" type="submit" color="primary"/>
       </div>
         </q-form>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'


export default {
    setup() {        
    const $store = useStore();
    const $q = useQuasar();
    const filename = ref(null)
    const isdatestamp = ref(null)    
      return{
          filename,
          isdatestamp,
          onSubmit(){
                            
              let exportDetails = {
                  fileName : filename.value,
                  isDateTime : isdatestamp.value == null ? false : true
              }
              $store.dispatch('common/addExportData', exportDetails)
              .then(val=>{
                   $q.notify({
                        color: 'positive',
                        position: 'top',
                        message: 'Successfully Added',
                        })
              })
              .catch(()=>{
                   $q.notify({
                        color: 'negative',
                        position: 'top',
                        message: 'Error when adding',
                        })
              })
          }
      }  
    }
      

}
</script>

<style>

</style>