<template>
<q-layout>
  <div class="row">
    <div class="col-md-7">
      <div class="bannerDiv row q-pa-xl justify-center">
           <div class="col-md-12 text-white">
             <p class="text-h3 q-p-none">
               Reset your password.
             </p>
             <span class="text-light">Lorem Ipsum Dolor Sitm</span>
           </div>
           <div class="col-md-12 q-pt-xl">
             <img src="~assets/vectors/forgot.svg" alt="Login_banner">
           </div>
      </div>
    </div>
    <div class="col-md-5 bg-white">
       <div class="q-pa-xl">
       <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
    <p class="text-h6 text-primary" v-if="!isOnlyMail">Change your Password</p>
    <p class="text-h6 text-primary" v-if="isOnlyMail">Enter Your Mail</p>
    <q-input v-if="isOnlyMail"
        square outlined
        v-model="userName"
        label="Your UserName *"
        hint="User Name"
        lazy-rules
        :rules="[ val => !!val || 'UserName is missing' ]"
      /> 
      <q-input v-if="!isOnlyMail"
        square outlined
        ref="passwordRef"
        type="password"
        v-model="password"
        label="Password *"
        hint="Password should be minimum 8 character"
        lazy-rules
        :rules="[
          val => !!val || '* Required',
          val => val.length >=  8 || 'Please use minimum 8 character',
        ]"
      />
     <q-input v-if="!isOnlyMail"
        square outlined
        ref="cpasswordRef"
        type="password"
        v-model="cpassword"
        label="Password *"
        lazy-rules
        :rules="[
        val=> val == password || 'Password and Confirm Password Must be same',
        val => !!val || '* Required',
        val => val.length >=  8 || 'Please use minimum 8 character',
        ]"
      />
      <div>
       <q-btn label="Submit" class="full-width" type="submit" color="primary"/>
       </div>
      <div class="q-pt-sm">
         <p class="light">
           By clicking this sign in button you agree to our terms & conditions
         </p>
          <p class="">
           <router-link to="/auth/" v-if="isOnlyMail">Login now</router-link>
         </p>
      </div>
         </q-form>
  </div>
    </div>
  </div>
  </q-layout>
</template>
<script>
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { api } from 'boot/axios'

export default {
  setup () {
    const $store = useStore()
    const $q = useQuasar()
    const cpasswordRef = ref(null)
    const cpassword = ref(null)
    const passwordRef = ref(null)
    const password = ref(null)
    const userName = ref(null)
    const isOnlyMail = ref(true)
    return {      
      cpassword,
      cpasswordRef,
      password,
      userName,
      passwordRef,
      isOnlyMail: $store.state.auth.isLocalForgot,      
      isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
       },  
      onSubmit () {   
       if(isOnlyMail){
                $store.dispatch('auth/sendResetMail', {
                  userName : userName.value,
                  email : ''
                })
       }
       else{
                $store.dispatch('auth/forgotPassword', password.value)                
       }      
         
      },    

       onReset () {
        // name.value = null
        // age.value = null
        // accept.value = false
      }
    }   
  }
}
</script>


<style lang="scss" scoped>
.q-layout{
  min-height: unset !important;
  .bannerDiv{
     margin-top: -50px;
     margin-bottom: -50px;
     background: $primary;
   }
}   
</style>