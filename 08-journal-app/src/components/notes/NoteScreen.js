import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { activeNote, startDeleting, updateNote } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active:note } = useSelector( state => state.notes );
    
    const [ formValues, handleInputChange, reset ] = useForm( note  );
    
    const { body, title,date } = formValues;
  
    const dispatch = useDispatch()

    const activeId = useRef( note.id );
    // const [formValues ,handleInputChange] = useForm({
    //     note
    // })

    useEffect(() => {

        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id
        }

    }, [note,reset])

    useEffect(() => {

    dispatch(activeNote(formValues.id,{...formValues}))
    }, [formValues,dispatch])
    
    // useEffect(() => {
    //    // reset(note)
    // }, [note])
    
    const handleDelete=()=>{

      dispatch(startDeleting(note.id))
    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

<input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="date"
                    value={ date }
                    onChange={ handleInputChange }
                />                

                { note.url &&

                    <div className="notes__image">
                        <img 
                            src={note.url}
                            alt="imagen"
                        />
                    </div>

                }
                       </div>
            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
        
    )
}
