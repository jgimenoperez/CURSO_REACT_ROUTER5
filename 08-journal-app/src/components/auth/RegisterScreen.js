import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { setError,removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch()
    const {msgError} = useSelector( (state)=>{
        return state.ui
    } ) 
    
    

    const [formvalues,handelImputChange] = useForm({

        name:'jose',
        email:'jgimenoperez1@gmail.com',
        password:'123456789',
        password2:'123456789'

    })

    const {name,email,password,password2} =formvalues

    const handleRegister = (e)=>{
        e.preventDefault()
        if (isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(email,password,name))
        }
    }

    const isFormValid = () =>{
       
        if (name.trim().length===0) {
           dispatch(setError('Name is required'))
           return false
        }else if(!validator.isEmail(email)){
           dispatch(setError('Mail no es valido'))
           return false
        }else if((password!==password2) || password.length <5){
            dispatch(setError('Passwords should be atg least 6 characters an match each other'))
            return false
        }

        dispatch(removeError())

        return true
    }
    
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>

               {     
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={ handelImputChange }
                   />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={ handelImputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={ handelImputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={ handelImputChange }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
