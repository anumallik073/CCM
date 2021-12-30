<template>
    <q-input
        square outlined
        v-model="username"
        label="User Name *"
        hint="User Name"
        lazy-rules
        :rules="[ val => !!val || 'UserName is missing' ]"
      /> 
</template>

<script>
export default {

}
</script>

<style>

</style>