<template>
  <q-card style="width: 700px; max-width: 80vw">
    <q-card-section class="q-ml-md">
      <div class="text-h6 text-uppercase">Add user</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
       <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
        <div class="row q-gutter-md q-pb-lg items-center">

    <div class="col">
      <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      </div>
<div class="col">
       <q-input
        filled
        v-model="userName"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      </div>

</div>
        <div class="row q-gutter-md q-pb-lg items-center">
  <div class="col">
      <q-input
        filled
        v-model="email"
        label="Your Email *"
        hint="Email Name"
        lazy-rules
        :rules="[ val => !!val || 'Email is missing', isValidEmail ]"
      />
      </div>
      <div class="col">
          <q-select
            label="Role"
            transition-show="flip-up"
            transition-hide="flip-down"
            filled
            v-model="role"
            :options="roleOptions"   
            option-label = "name"
            option-value = "id"         
            class="col-sm"
          />
          </div>
</div>
        <div class="row q-gutter-md q-pb-lg items-center">
<div class="col">
    <q-input
        filled
        ref="passwordRef"
        type="password"
        v-model="password"
        label="Password *"
        hint="Type your Password"
        lazy-rules
        :rules="[
          val => !!val || '* Required',
          val => val.length >=  8 || 'Please use minimum 8 character',
        ]"
      />
</div>
<div class="col">
 Gender:
        <q-option-group
          ref="genderRef"
          name="preferred_genre"
          v-model="preferred"
          :options="options"
          color="primary"
          inline
        />
</div>

</div>
        <div class="row q-gutter-md q-pb-lg items-center">
    <q-input filled
     ref="dateRef"
     v-model="date" mask="date" label="Date of Birth *"
 :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
</div>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
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
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'


export default {
  setup() {

     const $store = useStore()
    const $q = useQuasar()
    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)
    const email = ref(null)
    const userName = ref(null)
    const role = ref("Admin")
    const password = ref(null)
    const phoneNumber = ref(null)
    const companyName = ref(null)
    const companyURL = ref(null)
    const passwordRef = ref(null)
    const genderRef = ref(null)
    const dateRef = ref(null)
    const preferred = ref(0)
    const date = ref('2019/02/01')
    onBeforeMount(() => {
        $store.dispatch('common/getRoles')        
        // $store.dispatch('common/getRoles')        
      })
    return {
      name,  age, accept,
      email, userName, password,
      phoneNumber, companyName, companyURL,
      passwordRef, genderRef, dateRef, role,
      preferred, accepted: ref([]),
      shape: ref("line"),
      date: ref("2020/01/01"),
      roleOptions: computed(()=> $store.getters['common/getRoleOptions']),
      role,      
       options: [
        {
          label: 'Male',
          value: 0
        },
        {
          label: 'Female',
          value: 1
        },
        {
          label: 'Other',
          value: 2
        }
      ],
      date: ref('2019/02/01'),
      isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
     onSubmit ($event) {
        let userDetails = {
          "id": 0,
          "name": name.value,
          "userName": userName.value,
          "password": password.value,
          "email": email.value,
          "roleId": role.value.id,
          "gender": preferred.value,
          "dateOfBirth": date.value,
          "phone": "",
          "userType": 1,
          "registeredIP": "",
          "status": true,
          "deleted": false
        };
        

        $store.dispatch('common/updateUser', userDetails)
        // .then(val =>{
        //   if(val == "exist"){
        //      $q.notify({
        //     color: 'warning',
        //     position: 'top',
        //     message: 'Already Exist',
        //     })
        //   }
        //   else{
        //     $q.notify({
        //     color: 'positive',
        //     position: 'top',
        //     message: 'Successfully added',
        //     icon: 'success'
        //     })
        //   }
        // }).catch(()=>{
        //   $q.notify({
        //   color: 'negative',
        //   position: 'top',
        //   message: 'Signup Failed. Try Again',
        //   icon: 'report_problem'
        //   })
        // })        
      },
       onReset () {
         name.value = null;
         userName.value = null;
         email.value = null;
         password.value = null;         
      }
    };
  },
};
</script>