//Here combineReducers for combine the multiple reducers 
const {redux,createStore,combineReducers} = require('redux');
const BUY_CAKE = 'BUY_CAKE'
const BUY_CANDY = 'BUY_CANDYS'

//Action Creator
function buyCake(){
    return{
        //Action
        type:BUY_CAKE,
        info:'Buy Cake'
    }
}

function buyCandy(){
    return{
    type:BUY_CANDY,
    info:'Buy Candy'
}
}

const initialStateCake = {
    numOfCakes:10,
    
}
const initialStateCandy = {
    numOfCandy:20
}
const cakereducer = (state=initialStateCake,action)=>{
    switch(action.type){
        case BUY_CAKE:return{
            //To make the copy of state object we need to use spread operator
            ...state,
            numOfCakes:state.numOfCakes-1
        }
       
        default:return state
    }
}
const candyreducer = (state=initialStateCandy,action)=>{
    switch(action.type){
        case BUY_CANDY:return{
            ...state,
            numOfCandy:state.numOfCandy-2
        }
       
        default:return state
    }
}

//Here we are taking two reducers in a single reducer const variable
const reducers =  combineReducers({
    // cake:cakereducer,
    // candy:candyreducer

    //Alternative of above is 
    cakereducer,
    candyreducer
})

const store = createStore(reducers);
console.log('Initial State',store.getState());
const unscribe = store.subscribe(()=>console.log('upadated state',store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCandy())
store.dispatch(buyCandy())
store.dispatch(buyCandy())
unscribe()