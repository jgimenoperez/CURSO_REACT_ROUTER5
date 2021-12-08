import { type } from '../types/types';
/*
    {
        uid: 'jagdfjahdsf127362718',
        name: 'Fernando'
    }

*/
export const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case type.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        case type.logout:
                return { }
    
        default:
            return state;
    }

}