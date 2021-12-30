export const getToken = state => localStorage.getItem('token') ? localStorage.getItem('token') : '';

export const getPlans = state => state.plans;

export const getPages = state => state.pages;

export const getCountries = state => state.countries;

export const getState = state => state.state;

export const getCities = state => state.cities;

export const getProgramID = state => localStorage.getItem('pID');

export const getUser = state => state.userData;





