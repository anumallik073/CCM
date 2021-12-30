export default function () {
  return {
    // drawerState: true,
    loginForm: {
      Name : 'Saravanan',
      Email : 'saravanan@gmail.com',
      Password : '123'
    },
    token: '',
    isLocalForgot: true,
    plans: [
      {
        planID : 1,
        planName : "Basic",
        price : 50,
        catalogLimit : 10,
        sKUsLimit : 150000
      },
      {
        planID : 2,
        planName : "Power",
        price : 100,
        catalogLimit : 20,
        sKUsLimit : 250000
      },
      {
        planID : 3,
        planName : "Premium",
        price : 1000,
        catalogLimit : 21,
        sKUsLimit : 1000000
      }
    ],
    pages: [],
    basicDetails: {},
    countries: [],
    state:'',
    cities:[]
  }
}
