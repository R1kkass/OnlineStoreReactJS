const defaultState = {
    cash: 0, 
  }
  
  
  
export const reducer = (state = defaultState, action)=>{
    switch(action.type){
        case "ADD_CASH":
            return{...state, cash: action.payload}
        default:
            return state
    }
  }