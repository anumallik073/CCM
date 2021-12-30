import { api } from 'boot/axios'


export const getOverviewDetails = ({ state })=>{
    return new Promise((resolve, reject) => {
        api.get('catalogs/getdashboardoverviewdetails')
        .then((response) => {
            resolve(response)
        })
        .catch((err) => {
            reject(err.response)
        })
    })
}


export const getCatalogDetails = ({commit, state})=>{
    return new Promise((resolve, reject) => {
        
        api.get('catalogs/getallsubscribedCatalogs')
        .then((response) => {
            
            // resolve(response)
            commit('storeCatalogs', response);
        })
        .catch((err) => {
            reject(err.response)
        })
    })
}