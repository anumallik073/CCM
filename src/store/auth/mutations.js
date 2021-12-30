// export const updateDrawerState = (state, opened) => {
//     state.drawerState = opened
//     
//   }

export const storeAuth = (state, data) => {
    state.token = data
    localStorage.setItem('token', data)
  }
  
  export const storeUserDetials = (state, data) => {
    state.userData = data
  }

  export const storePlans = (state, data) => {
    state.plans = data
  }  
  
export const storePages = (state, data) => {
    // state.token = data
    // localStorage.setItem('token', data)
    state.pages = data
  }

export const storeProgramID = (state, programID) => {
   localStorage.setItem('pID', programID)
}

export const storeStateandCities = (state, data)=>{
    state.state = {
      stateName : data.stateName,
      stateCode : data.stateCode
    }
    data.stateName
    state.cities = data.cities
}

export const storeBasicDetails = (state, data)=>{
    state.basicDetails = data
}

export const storeCountries = (state, data)=>{
  state.countries = data
}