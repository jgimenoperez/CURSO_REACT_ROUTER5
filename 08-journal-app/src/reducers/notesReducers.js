import { type } from "../types/types"


const initialState= {
    notes:[],
    active:null
}

export const notesReducer = (state=initialState,action)=>{

    switch (action.type) {
        
        case type.notesActive:

            return {
               
                ...state,
                active: {
                    ...action.payload
                }                
            }
    
            case type.notesDelete:
                
                return{
                    ...state,
                     active:null,
                     notes:state.notes.filter(note=>note.id!==action.payload.id)
                }

            case type.notesLogoutCleaning:
               
                return{
                    ...state,
                    notes:[],
                    active:null
                }    

            case type.notesLoad:

                return{
                    ...state,
                    notes: [...action.payload]    
    
                } 
                
            case type.notesUpdate:
                console.log(action.payload.id)
                return {             
                    ...state,
                    notes:state.notes.map( 
                        note => note.id===action.payload.id
                        ? action.payload.note
                        : note
                    )
                }
        
                default:
                    return {
                        ...state
                    }
    }

}