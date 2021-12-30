import { api } from 'boot/axios'
import { Notify } from "quasar";


export const createUserStateActions = ({ commit, state }, payload) => {
    console.log(state)
    let userTableData = state.usersTableData.rows
    let isAlreadyExist = (userTableData.filter(val=> val.email == payload.email)).length
    if(isAlreadyExist > 0){
        return "exist"
    }
    payload['id'] = userTableData.length - 1;
    payload['status'] = true;
    commit('createUserState', payload)
}

export const updateUserStateActions = ({ commit }, payload) => {
    commit('updateUserState', payload)
}
export const deleteUserStateActions = ({ commit }, id) => {
    commit('deleteUserState', id)
}

export const deleteRoleStateActions = ({ commit }, id) => {
    commit('deleteRoleState', id)
}


export const updateUser = async ({ commit, state }, payload) => {    
    await api.post('settings/user', payload).then(res=>{
        commit('addNewUsers', res);  
        Notify.create({
            color: "positive",
            position: "top",
            message: "Updated Successfully",
          });      
     })
     .catch(()=>{
        Notify.create({
            color: "negative",
            position: "top",
            message: "Error when update the user",
          });      
     })  
}

export const addRole = async ({ commit, state }, payload) => {
    console.log(state)
    let roleTableData = state.rolesTableData.rows
    let isAlreadyExist = (roleTableData.filter(val=> val.rolename == payload.name)).length
    if(isAlreadyExist > 0){
        return "exist"
    }
    await api.post('settings/role', payload).then(res=>{
        commit('addRoles', res);
     })
     .catch(()=>{
        return "error"
     }) 
    // commit('createRoleState', payload)
}


export const addFTP = async ({ commit, state }, payload) => {
    await api.post('settings/configureftp', payload).then(res=>{
        // commit('addFTP', res);
        // return "success"
     })
     .catch(()=>{
        return "error"
     })    
}


export const addExportData = ({ commit, state }, payload) => {
    api.post('addExportData', payload).then(res=>{
        commit('addExportData', res);
        return "success"
     })
     .catch(()=>{
        return "error"
     })    
}


export const getUsers = async ({ commit, state }, payload) => {
    await api.get('Odata/user').then(res=>{
        commit('storeUsers', res);
     })
     .catch(()=>{
        return "error"
     })    
}


export const getRoles = async ({ commit, state }, payload) => {
    await api.get('Odata/role').then(res=>{
        commit('storeRoles', res);
     })
     .catch((err)=>{
        return "error"
     })    
}

export const updateRole = async ({ commit, state }, payload) => {
    await api.post('settings/role', payload).then(res=>{
        commit('addRoles', res);
     })
     .catch(()=>{
        return "error"
     })
}


export const getPages = async ({ commit, state }, payload) => {
    await api.get('settings/menu/false').then(res=>{
        commit('storePages', res);
     })
     .catch((err)=>{
        return "error"
     })    
}


