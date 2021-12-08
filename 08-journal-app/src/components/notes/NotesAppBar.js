import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const dispatch = useDispatch()
    const {active:note} = useSelector(state => state.notes)
    

    const savenote = ()=>{
        
        dispatch(startSaveNote(note))
    }

    const handelPictureClick = () =>{
        document.querySelector('#fileSelector').click()
        
    }

    const handelFileChange = (e) =>{
        const file= e.target.files[0]
        if (file){
            dispatch(startUploading(file)) 
        }
    }

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>
            <input
                type="file"
                id='fileSelector'
                name='file'
                style={{ display: 'none'}}
                onChange= {handelFileChange}
            />

            <div>
                <button 
                    className="btn"
                    onClick={handelPictureClick}
                >
                    Picture
                </button>

                <button 
                className="btn"
                onClick={savenote}
                >

                    Save
                </button>
            </div>
        </div>
    )
}
