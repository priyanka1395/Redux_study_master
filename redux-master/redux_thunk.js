/*
    There are three things in the when discuss about redux thunk as follows-

    1.Async Action => It is for asyncronous feature i.e it will act as asyncronous call of any process(which is it will not wait for the excute step by step)

    2.Redux Thunk => We know that action creator(action creator is a function which return action) return object but "thunk" return function "dispatch" as a parameter so, because of this we can call dispatch function n number times asyncronously 

    3.Axios=> It is use for the call the api i.e fetching the data from the server using axios

*/

const {redux,createStore,applyMiddleware} = require('redux');
const axios  =  require('axios')
const thunkMiddleWare = require('redux-thunk').default;

const initialState ={
    loading:false,
    users:[],
    error:''
}

const USER_REQUEST ='USER_REQUEST';
const USER_SUCESS ='USER_SUCESS';
const USER_ERROR ='USER_ERROR';

const userRequest=()=>{
    return {
        type :USER_REQUEST
    }
}

const userSuccess=(users)=>{
    //Here users is for the data for users
    return {
        type:USER_SUCESS,
        //Here we are using the payload which is same as info which we were using the previous example
        payload:users
        //Here we are taking users to payload same as pass to parameter to userSuccces function
    }
}

const userError=(error)=>{
    return{
        type:USER_ERROR,
        payload:error
    }
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case USER_REQUEST:return{
            ...state,
            loading:true
        }
        case USER_SUCESS:return{
            loading:false,
            users:action.payload, //This payload coming from the userSuccess function
            error:''
        }

        case USER_ERROR:return{
            loading:false,
            users:[],
            error:action.payload
        }
    }
}

const fetchUser =()=>{
    //Here we are returning the not object but a function because we are using the redux thunk and in that fuction we will get dispacth we discussed in the top. In above all the function we are returning the object
    return function(dispatch){
        dispatch(userRequest())
    //Then fetch the data using the axios
    axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
        const users = res.data.map(user=>user.name);
        //We got data successfully then we dispatch function can take the userSucess in th following manner

        dispatch(userSuccess(users)) // here we are passing the users same as we are getting after api call
    })
    .catch(err=>{
        dispatch(userError(err.message))
    })
    }

}


const store = createStore(reducer,applyMiddleware(thunkMiddleWare))
const unsubscribe = store.subscribe(()=>console.log("Some Store",store.getState()));
store.dispatch(fetchUser())
//Remember that dont call unsubscibe here at the end which we did previous code
