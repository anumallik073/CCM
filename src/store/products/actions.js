/*
export function someAction (context) {
}
*/
import { api } from 'boot/axios'

export const subscribeData = ({commit}, payload) =>{
    api.post('subscribe', payload)
    .then(val=>{

    })
    .catch(()=>{
        return "error"
    })
}


export const getSubscribedSuppliers = ({commit, state})=>{
    return new Promise((resolve, reject) => {
        
        api.get('catalogs/getsubscribedsuppliers')
        .then((response) => {
            
            // resolve(response)
            commit('storeSubSuppliers', response);
        })
        .catch((err) => {
            resolve(err.response)
        })
    })
}



export const getAllSuppliers = ({commit, state})=>{
    return new Promise((resolve, reject) => {
        
        api.get('catalogs/getallsupplers')
        .then((response) => {
            
            // resolve(response)
            commit('storeAllSuppliers', response);
        })
        .catch((err) => {
            resolve(err.response)
        })
    })
}