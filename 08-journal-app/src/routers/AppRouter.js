import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    //Route
  } from 'react-router-dom';
import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {
    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async (user)=>{
            if(user?.uid){

                dispatch(startLoadingNotes(user.uid))
                dispatch(login(user.uid,user.displayName))
                setisLoggedIn(true)
            }else{
                setisLoggedIn(false)
            }
            setChecking(false)
        })
        
    }, [dispatch,setChecking,setisLoggedIn])
    

    if (checking){
        return (
            <h1>Wait...</h1>
        )
    }else {

    }

    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route 
                        path="/auth"
                        component={ AuthRouter }
                    /> */} 


                    <PublicRoute
                        path="/auth"
                        component= { AuthRouter }
                        isAuthenticated={isLoggedIn}
                    />    


                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component= { JournalScreen }    
                        
                    />    

                    <Redirect to="/auth/login" />



                    {/* {     
   

                            isLoggedIn===true ?
                            (
                                <Route
                                    exact
                                    path="/"
                                    component= { JournalScreen }
                                />
                            ) :
                            (
                                <Route 
                                exact
                                path="/auth/login"
                                component= { AuthRouter }
                            />
                            )


                            
                        }  


                            {     
                            

                            isLoggedIn===true ?
                            (   
                                <Redirect to="/" /> 
                            ) :
                            (
                                <Redirect to="/auth/login" /> 
                            )


                            
                            }   */}

                       


                </Switch>
            </div>
        </Router>
    )
}
