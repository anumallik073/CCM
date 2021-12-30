<template>
      <q-layout class="authBody" view="hHh lpR fFf">
     <img class="loginLeftImg" src="~assets/vectors/loginDesign.png"/>
    <img class="loginRightImg" src="~assets/vectors/loginDesign.png"/>
  <div class="fixed-center loginWidth">
      <forgot></forgot>   
  </div>
  </q-layout>
</template>

<script>
export default {
  components:{    
      forgot : require('src/components/features/auth/forgot.vue').default
  }
}
</script>

<style>

</style>