import { type } from "../types/types"

export const setError= ( err )=>{

    return {
        type: type.uiSetError,
        payload: err
    }   
}

export const startLoading = ( ) => {

    return {
        type: type.uiStartLoading

    }

}


export const finishLoading  =()=>{

    return {
        type: type.uiFinishLoading,
    }   

}





export const removeError= (  )=>{

    return {
        type:type.uiRemoveError
        
    }   
}