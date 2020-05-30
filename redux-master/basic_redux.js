
//Redux is state management library for javascript apps in a predictable fashion.

//The following three are important concept in react as follows-
/*
CAKE SHOP SCENARIO =======  REDUX=============PURPOSE============================
Shop========================store====Hold the state of your application
Intension BUY_CAKE===========Action===Describe what happend
Shopkeepar============Reducer========Ties the store and action together

1.A store that hold the state of our application

2.An action decribe the changes in the state of the application

3.A reducer which actually carries out the state transition depending on action
*/


//Principle

/*
    1.All of your state store in a single object

    2.The only way to change the state is to emit an action, an object decribing what happend

    3.To update the state of your application write pure reducers

*/

/*
    1.Action
    ==>The only way your application to interact with store
    ==>It is plain Javascript object
    ==>Have 'type' property that indicate type of action to be perfomed
    ==>The 'type' property typically defined as a string constants
*/


//Action Example

/*Remember that action contain type property in an object

Also the Action creator function return an action
*/

const redux = require('redux');
const createStore = redux.createStore
const BUY_CAKE = 'BUY_CAKE'

function buyCake(){
    return{
        type:BUY_CAKE,
        info:'First Redux Action'
    }
}


/*2.Reducer
==>It is function that accepts state and action as arguments and return the step of your application
===>(previousState,action)==>New State
*/

//(previousState,action)==>New State

const initialState = {
    numOfCakes:10
}
const reducer = (state=initialState,action)=>{
    switch(action.type){
        case BUY_CAKE:return{
            //To make the copy of state object we need to use spread operator
            ...state,
            numOfCakes:state.numOfCakes-1
        }
        default:return state
    }
}


//3.Store
/*
    Responsibilities
    1.Holds application state
    2.Allow to access to state via getState()
    3.Allow state to be updated via dispatch(action)
    4.Register listner via subscibe
    5.Handle unregistring of listners via the fuction returned by sunscibe (listner)
*/

const store = createStore(reducer);
console.log('Initial State',store.getState());
const unscribe = store.subscribe(()=>console.log('upadated state',store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unscribe()