
import { type } from "../types/types";

const initialState={
    loading:false,
    msgError:null
}

export const uiReducer = ( state=initialState,action)=>{

    switch (action.type) {
        
        case type.uiSetError:
            return{
                ...state,
                msgError: action.payload
            }
            
        case type.uiRemoveError:
                return{
                    ...state,
                    msgError: null
                }
        case type.uiStartLoading:
            return{
                ...state,
                loading:true
            }   
            
        case type.uiFinishLoading:
            return{
                ...state,
                loading:false                
            }    
            
        default:
            return state;
    }
}