const defaultState = {
    find: '', 
  }

  
  
export const find = (state = defaultState, action)=>{
    switch(action.type){
        case "ADD_FIND":
            return{...state, find: action.payload}
        default:
            return state
    }
  }