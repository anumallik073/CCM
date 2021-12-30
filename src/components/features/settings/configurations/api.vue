<template>
  <div class="q-pa-md">
    <q-list>
      <q-item v-for="api in apiDetails" :key="api.id">
        <q-item-section>
          <q-item-label> {{ api.title }}</q-item-label>
          <q-item-label caption lines="2">{{ api.apiname }}</q-item-label>
        </q-item-section>

        <q-item-section side center>
          <q-icon name="mdi-content-copy" class="cursor-pointer" color="yellow" @click="copy(api.apiname)"/>
        </q-item-section>
        <q-separator spaced inset />
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { useQuasar, copyToClipboard } from 'quasar'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const $store = useStore();
        const $q = useQuasar();
        const apiDetails = ref(null);
        return{
            apiDetails: $store.state.common.apiDetails,
            copy(apiname){
                copyToClipboard(apiname)
                .then(() => {
                     $q.notify({
                        color: 'positive',
                        position: 'top',
                        message: 'Copied to clipboard',
                        })
                })
                .catch(() => {
                     $q.notify({
                        color: 'negative',
                        position: 'top',
                        message: 'Error when copy',
                        })
                })
            }
           
        }
    }

}
</script>

<style>

</style>