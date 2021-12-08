import Swal from "sweetalert2"
import { db } from "../firebase/firebase-config"
import { fileUpload } from "../helpers/fileUpload"
import { loadNotes } from "../helpers/loadNotes"
import { type } from "../types/types"


export const startNewNote = ()=>{
    return async ( dispatch, getState )=>{
        const {uid}=getState().auth
        
        const newNote={
            title: '',
            body:'',
            date: new Date().getTime()
        }

        const doc=await db.collection(`${ uid}/journal/notes`).add(newNote) 
        dispatch( activeNote( uid, newNote ) );

    }
}

export const activeNote = ( id, note ) => ({
    type: type.notesActive,
    payload: {
        id,
        ...note
    }
});


export const startLoadingNotes =  (uid) =>{

    
    return async(dispatch)=> {
        const notes = await loadNotes( uid )
        dispatch ( await setNotes(notes ))

    }

}


export const setNotes = (notes) =>{
    
    return {
        type: type.notesLoad,
        payload: notes
    }
}


export const startSaveNote =( note )=>{

    return async (dispatch,getState) =>{

        if(!note.url){delete  note.url}

        const {uid}=getState().auth
        
        const noteToFirestore = {...note}
        delete noteToFirestore.id
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
        .then( ()=>{
                        dispatch(refreshNote(note.id,note))
                        Swal.fire('Saved',note.title,'success')
                    }
        )
        .catch((e) =>{

            Swal.fire('Error',e.name,'error')
        })
        
        


    }

}

export const refreshNote  =(id,note)=>{


    return {
         type: type.notesUpdate,
         payload: {
             id,
             note
         }
        }
}

export const startUploading =  (file) =>{
    return async (dispatch, getState)=>{
        const {active:activeNote} = getState().notes
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton:false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });
 

        const fileurl= await fileUpload(file)
        activeNote.url=fileurl
        
        Swal.close()
        
        dispatch(startSaveNote(activeNote))
    }
}

export const startDeleting =(id)=>{
    return async (dispatch, getState)=>{
        const {uid}=getState().auth
        await db.doc(`${uid}/journal/notes/${id}`).delete()
        dispatch(deleteNote(id))
    }
}

export const deleteNote = (id) =>{

    return {
        type: type.notesDelete,
        payload: {
            id
        }
    }

}

export const cleanNotes=()=>{

    return{
        type:type.notesLogoutCleaning
    }

}