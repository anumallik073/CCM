<template>
  <div>
    <q-splitter
      v-model="splitterModel"
          >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-primary"
          active-color="primary"
          indicator-color="primary"
        >
          <q-tab name="ftp" icon="mdi-desktop-classic" label="FTP" />
          <q-tab name="api" icon="mdi-api" label="API" />
          <q-tab name="export" icon="mdi-export" label="Export" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="ftp">
           <ftp></ftp>
          </q-tab-panel>

          <q-tab-panel name="api">
              <api></api>
          </q-tab-panel>

          <q-tab-panel name="export">
              <export></export>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
setup () {
    return {
      tab: ref('ftp'),
      splitterModel: ref(20)
    }
  },
  components:{
    ftp: require('../configurations/ftp.vue').default,
    api: require('../configurations/api.vue').default,
    export: require('../configurations/export.vue').default, 
  }
}
</script>

<style>

</style>