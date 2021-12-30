<template>
  <div class="q-pa-md">

    <q-stepper style="height = 400px;"
      v-model="step"
      ref="stepper"
      alternative-labels
      color="primary"
      animated
      @before-transition = "test($event)"
      class="overflow-hidden"
    >
     
      <q-step
        keep-alive
        :name="1"
        title="Company Details"
        icon="mdi-pen"
        class="q-gutter-md"
        :done="done1"
      >   

     <q-form
      ref="basicForm"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
    <div class="row items-center q-gutter-md">

    <div class="col">
      <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      </div>
<div class="col">
       <q-input
        filled
        v-model="userName"
        label="Your User Name *"
        hint="UserName"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        @blur="validateUserName('username')"
      />
      </div>

</div>
<div class="row items-center q-gutter-md">
  <div class="col">
      <q-input
        filled
        v-model="email"
        label="Your Email *"
        hint="Email Name"
        lazy-rules
        :rules="[ val => !!val || 'Email is missing', isValidEmail ]"
        @blur="validateUserName('email')"
      />
      </div>
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
<!-- <div class="col">
 Gender:
        <q-option-group
          ref="genderRef"
          name="preferred_genre"
          v-model="preferred"
          :options="options"
          color="primary"
          inline
        />
</div> -->
<!-- <div class="col">
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
</div> -->

</div>
<div class="row items-center q-gutter-md">
  <!-- <div class="col">
    <q-input label="Phone Number" square outlined
              type="tel" 
              hint="Phone Number" 
              v-model="phoneNumber" 
              :rules="[ val => val && val.length > 0 || 'Please type something']"
             />
  </div> -->
  <div class="col">
            <q-input
            v-model="companyName"
              label="Company Name"
              square outlined  
              :rules="[ val => val && val.length > 0 || 'Please type something']"          
            />
  </div>
  <div class="col">
            <q-input
            v-model="companyURL"
              label="Company URL"
              square outlined            
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
  </div>
</div>

      <div class="row q-pl-md">
        <div class="col text-right">
           <q-btn label="Continue" type="submit" color="primary"/>
        </div>        
      </div>
    </q-form>   
        
    
    <q-stepper-navigation>
          <!-- <q-btn @click="() => { done1 = true; step = 2 }" color="primary" label="Continue" /> -->
        </q-stepper-navigation>
      </q-step>
       <q-step
        :name="2"
        title="Address Details"
        icon="mdi-pen "
        :done="done2"
      >
         <q-form
      @submit="onAddressSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
       <div class="row items-center q-gutter-md">

      <div class="col">
      <q-input
        filled
        v-model="billFirstName"
        label="First name *"
        hint="FirstName"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      </div>
<div class="col">
       <q-input
        filled
        v-model="billLastName"
        label="Last name *"
        hint="Last Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      </div>
      <div class="col">
      <q-input
        filled
        v-model="billAddressName"
        label="Address Name *"
        hint="Address Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      </div>
       </div>
              
      <div class="row items-center q-gutter-md">

       <div class="col">
      <q-input
        v-model="billLineOne"
        filled
        autogrow
        label="Line 1 *"
        hint="Address Line 1"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      </div>
      <div class="col">
      <q-input
        v-model="billLineTwo"
        filled
        autogrow
        label="Line 2 *"
        hint="Address Line 2"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      </div>
      <div class="col">
    <q-input label="Phone Number" square outlined
              type="tel" 
              hint="Phone Number" 
              v-model="billPhone" 
              :rules="[ val => val && val.length > 0 || 'Please type something']"
             />
      </div>      
      </div>   
      <div class="row items-center q-gutter-md">       
      <div class="col">
          <q-select
            label="Country"
            transition-show="flip-up"
            transition-hide="flip-down"
            filled
            v-model="billCountry"
            option-label = "countryName"
            option-value = "countryCode"
            :options="countries"
            class="col-sm"
          />
      </div>
       <div class="col">
        <q-input label="Zip Code" square outlined 
                  hint="Zip Code" 
                  v-model="zip" 
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                  @blur="getStateCities"
                />
      </div> 
        <div class="col">     
            <q-input
        filled
        v-model="billState"
        v-bind:value = "billState"
        label="State *"
        hint="State"        
      />      
      </div>
           
      <div class="col">
       <q-select
            label="City"
            transition-show="flip-up"
            transition-hide="flip-down"
            filled
            v-model="billCity"
            option-label = "cityName"
            option-value = "cityCode"
            :options="cities"
            class="col-sm"
          />
      </div>
    
      </div>   
       <q-btn type="submit" color="primary" label="Coninue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
       </q-form>  
         
   
         <q-stepper-navigation>
         
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="3"
        title="Select your Plan"
        icon="mdi-pen "
        :done="done3"
      >
        <div class="q-pa-md">
          <q-list>           
           <q-item tag="label" v-ripple v-for="plan in planDetails" :key="plan.planID">
              <q-item-section avatar>
                <q-radio v-model="selectedPlan" :val="plan.planID" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{plan.planName}}</q-item-label>
                <q-item-label captions>
                  Price : <b>${{plan.price}}</b>, Catalogs : <b>{{plan.catalogLimit}}</b>, SKU's : <b>{{plan.sKUsLimit}}</b>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
         <q-stepper-navigation>
          <q-btn @click="() => { done3 = true; step = 4 }" color="primary" label="Continue" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
       <q-step
        :name="4"
        title="Payment Details"
        icon="mdi-pen "
        :done="done4"
      >
      
         
       <q-form
      ref="basicForm"
      @submit="onCardSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
       <div class="row items-center q-gutter-md">

    <div class="col-12">
      <q-input
        filled
        v-model="cNum"
        label="Your Card Number *"
        hint="Card Number"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something', cardValidation]"
      />
      </div>
<div class="col-12">
       <q-input
        filled
        v-model="cName"
        label="Your card name *"
        hint="Card Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      </div>
       <div class="col">
      <q-input
        filled
        v-model="ccvNumber"
        label="CCV *"
        hint="CCV Number"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      </div>
      <div class="col">
      <q-input filled
     ref="cMonthRef"
     v-model="cMonth" label="Expiry Month"
 :rules="['cMonth']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="cDateProxy" cover transition-show="scale" transition-hide="scale">
                <q-date
                minimal
                :emit-immediately="true"
                default-view="Years"
                mask="YYYY/MM"
                 v-model="cMonth">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
     
      </div>
       <q-btn type="submit" color="primary" label="Finish" />
          <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
       </q-form>
         <q-stepper-navigation>
         
        </q-stepper-navigation>
      </q-step>
    </q-stepper>

  </div>
</template>
<script>
import { useQuasar } from 'quasar'
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { api } from 'boot/axios'


export default {
  setup (props, context) {
    const $store = useStore()
    const $q = useQuasar()
    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)
    const email = ref(null)
    const userName = ref(null)
    const password = ref(null)
    const phoneNumber = ref(null)
    const companyName = ref(null)
    const companyURL = ref(null)
    const passwordRef = ref(null)
    const genderRef = ref(null)
    const dateRef = ref(null)
    const cMonthRef = ref(null)
    const cMonth = ref(null)
    const ccv = ref(null)
    const ccvNumber = ref(null)
    const cvvRef = ref(null)
    const cNum = ref(null)
    const cName = ref(null)
    const preferred = ref(0)
    const basicForm = ref(null)
    const done1 = ref(false)
    const done2 = ref(false)
    const done3 = ref(false)
    const done4 = ref(false)
    const date = ref('2019/02/01')
    const step= ref(1)
    const selectedPlan =  ref(1)
    //For Billing Start
    const billFirstName = ref(null)
    const billLastName = ref(null)
    const billAddressName = ref(null)
    const billCountry = ref(null)
    const billState = ref(null)
    const billCity = ref(null)
    const billLineOne = ref(null)
    const billLineTwo = ref(null)
    const billPhone = ref(null)
    const zip = ref(null)

    //Billing End
    const onCardSubmit = ()=>{
    let form_data = new FormData();
    // form_data.append('cardName', cName.value)
    // form_data.append('cardNumber', cNum.value)
    // form_data.append('cvv', ccvNumber.value)
    // form_data.append('cMonth', cMonth.value)  
    // form_data.append('planID', selectedPlan.value)
     let cardDetails = {
       firstName : billFirstName.value,
       lastName : billLastName.value,
       creditCardNumber : cName.value,
       planID : selectedPlan.value,
       emailAddress : email.value,
       cvv : cvv.value,
       expirationMonth : cMonth.value.split('/')[1],
       expirationYear : cMonth.value.split('/')[0]
     }
     $store.dispatch('auth/payment', form_data)
     .then((response) => {        
        if(response == "success"){
          $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Payment completed successfully',
        })
        router.push('/auth')
        }
        else{
           $q.notify({
          color: 'warning',
          position: 'top',
          message: 'Payment Failed',
        })
        }
      })
    }
    const onAddressSubmit = ($event)=>{
      let addressDetails = {
        //  FirstName : billFirstName.value,
        //  LastName : billLastName.value,
         addressName : billAddressName.value,
         line1 : billLineOne.value,
         line2 : billLineTwo.value,
         phone : billPhone.value,
         countryName : billCountry.value.countryName,
         countryCode : billCountry.value.countryCode,
         stateCode : $store.getters['auth/getState'].stateCode,
         stateName : $store.getters['auth/getState'].stateName,
         city : billCity.value.cityName,
         zipCode: zip.value,
         accountID : 59
      }
      $store.dispatch('auth/addAddress', addressDetails)
      done2.value = true;
      step.value = 3
    }
    const onSubmit = ($event)=> {
        
        done1.value = true;
        step.value = 2;
        console.log(step)
        let signUpDetails = {
          name : name.value,
          userName : userName.value,
          email : email.value,
          password : password.value,
          // Gender : preferred.value == 0 ? 'Male' : preferred.value == 1 ? 'Female' : 'Other',
          // Date : date.value,
          companyName : companyName.value,
          companyURL : companyURL.value,
        };
        $store.dispatch('auth/createUser', signUpDetails)
      .then((response) => {       
        $store.dispatch('auth/storeBasicDetails', response)
        if(response == "success"){
          $q.notify({
          color: 'positive',
          position: 'top',
          message: 'User Created Successfully',
        })
        router.push('/auth')
        }
        else{
           $q.notify({
          color: 'warning',
          position: 'top',
          message: 'Signup Failed. Try Again',
        })
        }
      })       
    }
    onBeforeMount(() => {
       $store.dispatch('auth/getCountries')
    })
    // step = ref(1)
    // cstep = ref(1)
    return {
      name,  age, accept,
      email, userName, password, basicForm,
      phoneNumber, companyName, companyURL, cvvRef,
      passwordRef, genderRef, dateRef,cMonthRef, cMonth,  done1,
      done2, done3, done4, ccv, cName, cNum, ccvNumber, billFirstName, billLastName, billAddressName, billCountry,
      billCity, billLineOne, billLineTwo, billPhone,
      preferred, accepted: ref([]), step,
      selectedPlan,zip,
      planDetails : computed(()=> $store.getters['auth/getPlans']),
      countries : computed(()=> $store.getters['auth/getCountries']),      
      billState : computed(()=> $store.getters['auth/getState'].stateName),      
      cities : computed(()=> $store.getters['auth/getCities']),      
      //credit card validation
      cardValidation(val){
          var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
          var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
          var amexpRegEx = /^(?:3[47][0-9]{13})$/;
          var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
          var isValid = false;
          if (visaRegEx.test(val)) {
            isValid = true;
          } else if(mastercardRegEx.test(val)) {
            isValid = true;
          } else if(amexpRegEx.test(val)) {
            isValid = true;
          } else if(discovRegEx.test(val)) {
            isValid = true;
          }

          if(isValid) {
            return isValid
          } else {
            return "Please provide a valid Visa number!";
          }
      },
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
      validateUserName(type){
        let val = {
          value : type == 'email' ? email.value : userName.value,
          type : type
        } 
        $store.dispatch('auth/validateUser', val)
        .then(res=>{
          if(res){
            $q.notify({
              color: 'warning',
              position: 'top',
              message: type+' Already Exist',
              })
              type == 'email' ? email.value = '' : userName.value = ''
          }
          else{
            
          }
          
          return res
        })
      },
      isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
    getStateCities(){
        console.log(billCountry)
        console.log(zip)
        let data = {
          countryCode : billCountry.value.countryCode,
          zipCode : zip.value
        }
        $store.dispatch('auth/getStateandCities', data)
    },
    test(event){
      // if(event == 2){
      //   this.basicForm.validate().then(valid=>{ 
      //     if(valid){
      //           $q.notify({
      //         color: 'warning',
      //         position: 'top',
      //         message: 'Fill the all details',
      //       })
      //       this.step = 1
      //     }
      //     })
      //   }
    },
    onAddressSubmit,
    onSubmit,
    onCardSubmit,
    setValidation(){
      
    },
      

      onReset () {
        // done1.value = false
        // done2.value = false
        // done3.value = false
        // step.value = 1
      }
    }
  },
  beforeMount() {
    
    console.log(this.step)
  },
  updated() {
    
    console.log(this.step)
  },
  beforeUpdate() {
    
    console.log(this.step)
  },
}
</script>