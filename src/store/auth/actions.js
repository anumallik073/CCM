import { api } from 'boot/axios'
import { route } from 'quasar/wrappers';
import { Notify } from 'quasar'

//Login Authentication
export const login = ({ commit }, payload) => {     
        // payload.password = Buffer.from(payload.password, 'base64')
        return new Promise((resolve, reject) => {
        api.post('login', payload)        
        .then((response) => {
            localStorage.setItem('token', response.access_token)       
            Notify.create({
                color: 'positive',
                position: 'top',
                message: 'Login Successfull',
              })
            resolve('success')
        })
        .catch((err) => {          
            reject(err.response)
        })        
    })        
        // localStorage.setItem('token', "asaushda7sd7q63t7qyg7qt6tdf6356r2w63298yw92quwdbquhwdbuq")  
        // return "success"     
}

export const createUser = async ({commit}, payload) =>{
    debugger
    try {
        const createdUser = await api.post('common/registeraccount', payload)
        commit('storeUserDetials', createdUser)
        return createdUser
    } catch (error) {
        return "error"
    }
        
        // .then((response) => {
        //     return response
        // })
        // .catch((err) => {
        //     return err.response
        // })
}


export const storeBasicDetails = ({commit}, payload) =>{
    commit('storeBasicDetails', payload)
}


export const forgotMail = ({commit}, payload) =>{
    api.post('sendmail', payload)
    .then(val=>{

    })
    .catch(()=>{
         return "error"
    })
}


export const forgotPassword = ({commit}, payload) =>{
    api.post('changepassword', payload)
    .then(val=>{

    })
    .catch(()=>{
        return "error"
    })
}

export const payment = async ({commit}, payload) =>{
    try {
     const payment = await api.post('common/createsubscription', payload);
     return payment   
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error When doing payments',
          })
    }    
}

export const getPages = async ({ commit, state }, payload) => {
    await api.get('settings/menu/true').then(res=>{
        commit('storePages', res);
     })
     .catch((err)=>{
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error When Getting the Plans',
          })
     })    
}


export const getPlans = async ({ commit }, payload) => {
    debugger
    try {
        const plans = await api.get('common/getplansbyprogramid/'+payload);
        plans.forEach(element => {
            element.detail = JSON.parse(element.detail)
        });    
        commit('storePlans', plans);
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error When Getting the Plans',
          })
    }
}

export const getProgramID = async ({ commit, state }, payload) => {
    await api.get('common/getprogrambyurl?url='+payload).then(res=>{        
        commit('storeProgramID', res.id)
     })
     .catch((err)=>{
        return "error"
     })    
}

export const getCountries = async ({ commit, state }, payload) => {
    await api.get('common/getCountries').then(res=>{
        commit('storeCountries', res);
     })
     .catch((err)=>{
        return "error"  
     })    
}

export const validateUser = async ({commit}, payload) =>{
    try {
        const validateUserorMail = await api.get('common/isusernameoremailexist/'+payload.programID+'/'+payload.type+'/'+payload.value)
        return validateUserorMail   
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error When Validating the userName',
          })
    }       
}

export const getStateandCities = async ({ commit, state }, payload) => {
    await api.get('common/GetAllStatesByZipCode/'+payload.zipCode+'/'+payload.countryCode)
    .then(res=>{
        commit('storeStateandCities', res);
     })
     .catch((err)=>{
        return "error"  
     })    
}


export const addAddress = async ({commit}, payload) =>{
    try {
        const address = await api.post('common/saveaddressbook', payload)    
        return address
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error When Adding address',
          })
    }
}


export const sendResetMail = async ({commit}, payload)=>{
    try {
        const reset = await api.post('common/sendpasswordresetlink', payload)   
        if(reset){
            Notify.create({
                color: 'positive',
                position: 'top',
                message: 'Reset link sent to your Mail',
              })
            }
        else{
            Notify.create({
                color: 'warning',
                position: 'top',
                message: 'Check',
              })
            }        
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error When sending link',
          })
    }
}



export const logout = ()=>{
    localStorage.removeItem('token');
    return "success"
}