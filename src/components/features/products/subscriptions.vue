<template>
  <div class="q-pa-md q-gutter-sm settingsDiv">
    <div class="row">
        <div class="col">
              <!-- <div class="text-h6">
                    subscriptions
               </div> -->
        </div>
        <div>
              <q-select
                label="Filter by Industry"
                transition-show="flip-up"
                transition-hide="flip-down"
                filled
                v-model="industry"
                :options="category"
                option-label="name"
                option-value="id"
                style="width: 250px"
                @update:model-value="filterByIndustry($event)"
              />
        </div>
    </div>

 <q-table :rows="filteredRows"       
 :columns="columns" title="Subscriptions" row-key="name"
 :filter="filter">
        <template v-slot:top>
          <div class="text-h6">Subscriptions</div>
          <q-space /> 
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>      
        </template>         
        <template v-slot:body="props">
          <q-tr :props="props">
            <!-- <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td> -->
             <q-td key="providerLogo" :props="props">
              {{ props.row.providerLogo }}             
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.name }} 
                      <q-icon name="mdi-information-outline" size="sm" color="primary" class="cursor-pointer">
                           <q-menu
                    transition-show="scale"
                    transition-hide="scale"
                    max-width="700px"                    
                    >
                      <div class="q-pa-md"> 
                        <p class="text-subtitle1 text-primary">Details</p>
                            <p class="modal-text">
                              {{ props.row.description }}  
                            </p>
                            <q-separator />
                            <div class="row">
                                <table class="detailsTable">
                                    <thead>
                                        <th>Brands</th>
                                        <th>Categories</th>
                                        <th>Products</th>
                                        <th>SKU's</th>
                                        <th>Pricing</th>
                                        <th>Catalog Updates</th>
                                        <th>Approval</th>
                                        <th>Last Published</th>
                                    </thead>
                                    <tbody>
                                        <td>1</td>
                                        <td>{{ props.row.categories }}</td>
                                        <td>{{ props.row.products }}</td>
                                        <td>{{ props.row.skUs }}</td>
                                        <td>MSRP</td>
                                        <td>{{ props.row.updateTypes }}</td>
                                        <td>{{ props.row.approvalType }}</td>
                                        <td>{{ props.row.lastPublished }}</td>
                                        </tbody>
                                </table>
                            </div>
                   <q-separator />
                     <div>
                        <div class="col"><p class="text-subtitle1 modal-text text-bold q-pt-sm">View Brands</p></div>
                        <div>
                            <img class="supplierModal-img q-mr-lg" src="https://az777500.vo.msecnd.net/images/1928/newadarlogo_120133.jpg" />
                            <img class="supplierModal-img" src="https://az777500.vo.msecnd.net/images/1928/newadarlogo_120133.jpg" />

                        </div>
                     </div>
                      </div>
                    </q-menu>
                      </q-icon>          
            </q-td>
            <q-td key="updateTypes" :props="props">
              {{
                props.row.updateTypes                
              }}           
            </q-td>
            <q-td key="subscription" :props="props">   
               <q-btn color="positive" label="Subscribe" v-if="props.row.subscription == 'Subscribed'">
                    <q-menu
                    transition-show="scale"
                    transition-hide="scale"
                    max-width="250px"                    
                    >
                      <div class="q-pa-md">

                    <q-form
                        @submit="onSubmit"
                        @reset="onReset"
                        class="q-gutter-md"
                        >
                        <p class="text-subtitle2 text-primary">Subscription Request</p>
                        <q-input
                            square outlined dense
                            v-model="accoutnID"
                            label="Supplier ID *"
                            lazy-rules
                            :rules="[ val => !!val || 'Supplier ID is missing' ]"
                        /> 
                        <q-input
                            square outlined dense
                           v-model="notes"
                            label="Notes"
                             lazy-rules
                            :rules="[ val => !!val || 'Notes is missing' ]"
                        />
                         <div class="q-pt-sm">
                            <p class="light">
                               Are you sure you want to request the entire catalog from supplier?
                            </p>         
                        </div>
                        <div>
                         <div class="row">
                             <div class="col">
                                  <q-btn label="No" color="warning"/>
                             </div>
                             <div class="">
                                 <q-btn label="Yes" type="submit" color="primary"/>
                             </div>
                         </div>                           
                        </div>
                            </q-form>
                            </div>
                    </q-menu>
                </q-btn>      
            </q-td>
             <q-td key="approvalType" :props="props">
              <div class="text-pre-wrap">
                {{ props.row.approvalType ? "Active" : "Inactive" }}
              </div>             
            </q-td>
             <!-- <q-td key="category" :props="props">
              <div class="text-pre-wrap">
                {{ props.row.category ? "Active" : "Inactive" }}
              </div>             
            </q-td>             -->
          </q-tr>
        </template>
      </q-table>
    </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from "vuex";
import { useQuasar, QSpinnerClock } from "quasar";

export default {
 setup () {     
    const $store = useStore();
    const $q = useQuasar();
     const accountID = ref(null)
    const notes = ref(null)
    onBeforeMount(() => {
        $store.dispatch('products/getAllSuppliers')
    });
    return {
        accountID,
        notes,
      industry: ref(null),
      filter: ref(''),
      filteredRows : computed(()=> $store.getters['products/subscriptionRow']),
      columns : computed(()=> $store.getters['products/subscriptionCol']),
      category : computed(()=> $store.getters['products/subscriptionCat']),
      rows : computed(()=> $store.getters['products/subscriptionRow']),
      filterByIndustry(row){
            $q.loading.show({
            spinner: QSpinnerClock,
            spinnerColor: 'white',
            backgroundColor: 'black',
            })
            this.filteredRows = [...this.rows].filter(val=> val.category == row.name)
            setTimeout(() => {
                $q.loading.hide()
            }, 500);
      },
      onSubmitSubscribe(){
          let subscibeData = {
              accountID : accountID.value,
              notes : notes.value == null ? '' : notes 
          }
          $store.dispatch('products/subscribeData', subscibeData)
          .then(val=>{
               
          })
          .catch(()=>{

          })
      }
    }
  },
  // beforeUpdate() {
  //       this.filteredRows = [...this.rows]
  //     }
}
</script>

<style lang="scss">
.detailsTable{
    th,td{
        padding: 10px;
    }
    th{
        font-size: 12px;
    }
}
.supplierModal-img{
    height: 22px;
}
</style>

