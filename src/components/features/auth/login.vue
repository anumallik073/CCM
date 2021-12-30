<template>
<q-layout>
  <div class="row">
    <div class="col-md-7">
      <div class="bannerDiv row q-pa-xl justify-center">
           <div class="col-md-12 text-white">
             <p class="text-h3 q-p-none">
               Start Your Journey.
             </p>
             <span class="text-light">Lorem Ipsum Dolor Sitm</span>
           </div>
           <div class="col-md-12 q-pt-xl">
             <img src="~assets/vectors/login-vector.webp" alt="Login_banner">
           </div>
      </div>
    </div>
    <div class="col-md-5">
       <div class="q-pa-xl">
       <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
    <p class="text-h6 text-primary">Login with your details</p>
       <q-input
        square outlined
        v-model="username"
        label="User Name *"
        hint="User Name"
        lazy-rules
        :rules="[ val => !!val || 'UserName is missing' ]"
      /> 
      <q-input
        square outlined
        ref="passwordRef"
        type="password"
        v-model="password"
        label="Password *"
        hint="Password should be minimum 8 character"
        lazy-rules
        :rules="[
          val => !!val || '* Required',
          val => val.length >=  5 || 'Please use minimum 5 characters',
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
           <!-- <a href="javascript:void(0)" @click="toForgot">Forgot Password</a> -->
           <router-link to="forgot">Forgot Password</router-link>
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
import { useRouter, useRoute } from 'vue-router'

export default {
  setup () {
    const $store = useStore()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const username = ref(null)
    const passwordRef = ref(null)
    const password = ref(null)
    return {      
      username,
      password,
      passwordRef, 
     onSubmit () {   
       let loginForm = {
          userName : username.value,
          password : password.value
         };      
      // api.post('gateway/gettoken', loginForm)
      $store.dispatch('auth/login', loginForm)
      .then((response) => {        
        if(response == "success"){
          $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Login Successfull',
        })
        router.push('/')
        }
        else{
           $q.notify({
          color: 'warning',
          position: 'top',
          message: 'Error Occured',
        })
        }
      })
      .catch(() => {
         $q.notify({
          color: 'warning',
          position: 'top',
          message: 'Check your Credentials',
        })
      })
         
      }, 
      // toForgot(){
      //    
      //   router.push({ name: 'forgot' })
      // },  

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