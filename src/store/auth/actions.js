import { api } from 'boot/axios'
import { route } from 'quasar/wrappers';

//Login Authentication
export const login = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        api.post('gettoken', payload)
        // api.post('gateway/gettoken', payload)
        .then((response) => {
            // commit('storeAuth', response.access_token) 
            localStorage.setItem('token', response.access_token)       
            resolve('success')
        })
        .catch((err) => {
            reject(err.response)
        })
    })
}

export const createUser = async ({commit}, payload) =>{
        await api.post('customer/registeraccount', payload)
        // api.post('gateway/gettoken', payload)
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
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
    await api.post('payment/createsubscription', payload)
    .then(val=>{
    })
    .catch(()=>{
        return "error"
    })
}

export const getPages = async ({ commit, state }, payload) => {
    await api.get('settings/menu/true').then(res=>{
        commit('storePages', res);
     })
     .catch((err)=>{
        return "error"
     })    
}

export const getCountries = async ({ commit, state }, payload) => {
    await api.get('settings/getCountries').then(res=>{
        commit('storeCountries', res);
     })
     .catch((err)=>{
        return "error"  
     })    
}

export const validateUser = async ({commit}, payload) =>{
    await api.get('settings/UserNameOrEmailExist/'+payload.value+'/'+payload.type)
    .then((response) => {
        debugger
        return response
    })
    .catch((err) => {
        return err.response
    })
}

export const getStateandCities = async ({ commit, state }, payload) => {
    await api.get('settings/GetAllStatesByZipCode/'+payload.zipCode+'/'+payload.countryCode)
    .then(res=>{
        commit('storeStateandCities', res);
     })
     .catch((err)=>{
        return "error"  
     })    
}


export const addAddress = async ({commit}, payload) =>{
    await api.post('settings/addAddress', payload)
    .then((response) => {
        return response
    })
    .catch((err) => {
        return err.response
    })
}




export const logout = ()=>{
    localStorage.removeItem('token');
    return "success"
}