// export const updateDrawerState = (state, opened) => {
//     state.drawerState = opened
//     
//   }

export const storeAuth = (state, data) => {
    state.token = data
    localStorage.setItem('token', data)
  }

  
export const storePages = (state, data) => {
    // state.token = data
    // localStorage.setItem('token', data)
    state.pages = data
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