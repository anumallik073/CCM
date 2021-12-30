export const createUserState = (state,payload) => {
     state.usersTableData.rows.push(payload)
  }
export const updateUserState = (state,index) => {
    
  }
export const deleteUserState = (state,id) => {
    // 
    let index = state.usersTableData.rows.map( el => el.id ).indexOf(id)
    state.usersTableData.rows.splice(index,1);
    // 
  }


  export const deleteRoleState = (state,id) => {
    let index = state.rolesTableData.rows.map( el => el.id ).indexOf(id)
  
    state.rolesTableData.rows.splice(index,1);
  }

  export const updateUser = (state,row) => {
     state.usersTableData.rows[row.id] = row
  }

  export const updateRole = (state,row) => {
    state.rolesTableData.rows[row.id] = row
 }

  export const createRoleState = (state,payload) => {
    state.rolesTableData.rows.push(payload)
 }

 export const storeUsers = (state,payload) => {
  state.usersTableData.rows = payload
}

export const storeRoles = (state,payload) => {
  state.rolesTableData.rows = payload
}

export const addRoles = (state,payload) => {
  state.rolesTableData.rows.push(payload)
}

export const addNewUsers = (state,payload) => {
  state.rolesTableData.rows.push(payload)
}

export const storePages = (state,payload) => {
  state.rolesTableData.pages = payload
}

 export const addFTP = (state, payload) => {
   
 }

 export const addExportData = (state, payload) => {
   
}