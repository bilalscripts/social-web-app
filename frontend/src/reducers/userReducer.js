export const initilaState = null;

export const reducer = (state, action)=>{
    if(action.type==="User")
    {
        return action.payload
    }
    if(action.type==="CLEAR"){
        return null;
    }
    return state;
}