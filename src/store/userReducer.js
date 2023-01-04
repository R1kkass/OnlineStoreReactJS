const defaultUser ={
    user: 'none'
  }
  
export const fetchUserOne = (state = defaultUser, action)=>{
    switch(action.type){
      case "FIND_USER":
        return {...state, user: action.payload}
      default:
        return state
    }
  }