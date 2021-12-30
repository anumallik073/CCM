<template>
    <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Overview</div>
          </q-card-section>
    
          <q-separator />
    
          <div class="row items-center q-pa-md">
            <div class="col-4">
              <div class="row">
                <q-btn
                  color="secondary"
                  round
                  icon="mdi-book-open-page-variant-outline"
                  class="q-ml-md primary-text"
                  style="font-size: 1.5rem"
                >
                </q-btn>
    
                <q-item-section class="q-pl-lg">
                  <q-item-label style="font-size:18px" class="overview-text">NUMBER OF CATALOGS</q-item-label>
                  <q-item-label style="font-size:24px" class="overview-num">{{ overViewDetails.catalogs }}</q-item-label>
                </q-item-section>
              </div>
            </div>
            <div class="col-8">
              <q-card-section class="overview flex">
                <q-item-section>
                  <q-item-label class="overview-text">NUMBER OF PRODUCTS</q-item-label>
                  <q-item-label class="overview-num">{{ overViewDetails.products }}</q-item-label>
                </q-item-section>
    
                <q-item-section class="q-px-md">
                  <q-item-label class="overview-text">NUMBER OF <br>SKUs</q-item-label>
                  <q-item-label class="overview-num">{{ overViewDetails.skUs }}</q-item-label>
                </q-item-section>
    
                <q-item-section>
                  <q-item-label class="overview-text">SKUs OUT OF<br> STOCK</q-item-label>
                  <q-item-label class="overview-num">{{ overViewDetails.skUsOutOfStock }}</q-item-label>
                </q-item-section>
              </q-card-section>
    
              <q-separator inset />
    
              <q-card-section class="overview flex">
                <q-item-section>
                  <q-item-label class="overview-text">CATALOGS DOWNLOADED</q-item-label>
                  <q-item-label class="overview-num">{{ overViewDetails.catalogs }}</q-item-label>
                </q-item-section>
    
                <q-item-section>
                  <q-item-label class="overview-text">NUMBER OF API REQUESTS</q-item-label>
                  <q-item-label class="overview-num">{{ overViewDetails.apIsRequested }}</q-item-label>
                </q-item-section>
                 <q-item-section>
    
                </q-item-section>
              </q-card-section>
            </div>
          </div>
        </q-card>
      </div>
</template>
<script>
import { useQuasar } from 'quasar'
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {  
  setup() {
      const $store = useStore()
      const $q = useQuasar()
      const overViewDetails = ref({})
      onBeforeMount(() => {
        $store.dispatch('home/getOverviewDetails')
        .then(response=>{
          overViewDetails.value = response
        })
        .catch(err=>{
          
        })
      })
      return{
        overViewDetails
      }
  },
}
</script>
<style lang="scss" scoped>
.overview-num {
  font-weight: bolder;
  font-size: 20px;
}
.overview-text {
  font-size: 14px;
}
</style>
