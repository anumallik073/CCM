import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://localhost:44386/gateway/' })//common 
// const api = axios.create({ baseURL: 'https://localhost:44349/' })//login 
// const api = axios.create({ baseURL: 'https://localhost:44394/api/' })//Settings
// const api = axios.create({ baseURL: 'https://localhost:44374/api/' })//catalogs 
// const api = axios.create({ baseURL: 'https://localhost:44398/' })//Register
// const api = axios.create({ baseURL: 'https://localhost:44392/api/' })//Payment
// const api = axios.create({ baseURL: 'http://192.168.2.32:83/' })

export default boot(({ app, store, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api

  api.interceptors.request.use(async req=>{
    if(req.url == 'gettoken' || req.url == 'customer/registeraccount'
    || req.url == 'payment/createsubscription' || req.url.includes('settings/UserNameOrEmailExist')
    ){
      return req
    }
    
    const token = store.getters['auth/getToken']
    req.headers.Authorization = `Bearer ${token}`
      return req
  })

  api.interceptors.response.use(async res=>{
    return res.data
  })

  router.beforeEach((val)=>{
    if(val.path == '/auth/forgot'){
       store.state.auth.isLocalForgot = true;
    }
    if(val.path == '/subscirptions'){
      // store.state.auth.
    }
  })
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
