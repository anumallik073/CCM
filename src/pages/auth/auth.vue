<template>
<q-layout class="authBody" view="hHh lpR fFf">
     <img class="loginLeftImg" src="~assets/vectors/loginDesign.png"/>
    <img class="loginRightImg" src="~assets/vectors/loginDesign.png"/>
  <div class="fixed-center loginWidth">
  <!-- <div class="fixed-center"> -->
    <q-splitter
     style="height: 400px"
      v-model="splitterModel"
    >
      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          indicator-color = "primary"
          active-bg-color = "white"
          class="text-teal"
        >
          <q-tab name="login" icon="mdi-login" label="Login" class="mt-50 bg-white text-primary">
            <!-- <q-icon name="mdi-login" size="lg"/> -->
          </q-tab>
          <q-tab name="signup" icon="mdi-account-plus" label="signup" class="bg-white text-primary" />
          <!-- <q-tab name="forgot" icon="mail" label="forgot" /> -->
          <!-- <q-tab name="forgot" icon="mdi-account-plus" label="forgot" class="bg-white text-primary" /> -->
          <!-- <q-tab name="forgot" icon="mail" label="forgot" /> -->
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
          <q-tab-panel name="login">
           <login></login>
          </q-tab-panel>

          <q-tab-panel name="signup">
           <signup></signup>
          </q-tab-panel>

           <q-tab-panel name="forgot">
           <forgot></forgot>
          </q-tab-panel>
         
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
  </q-layout>
</template>

<script>
  import { ref, onBeforeMount } from 'vue'
  import { useStore } from "vuex";

export default {
   setup () {
     const $store = useStore();
    onBeforeMount(() => {
      $store.dispatch('auth/getProgramID', window.location.origin)
    })
    return {
      tab: ref('login'),
      splitterModel: ref(20)
    }
  },
  components:{
      login : require('src/components/features/auth/login.vue').default,
      signup : require('src/components/features/auth/signup.vue').default,
      forgot : require('src/components/features/auth/forgot.vue').default
  }
}
</script>

<style lang="scss">

</style>
