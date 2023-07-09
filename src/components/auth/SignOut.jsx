import React from 'react'
import {auth} from '../../firebase'
import {signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import NavBtn from '../NavBtn'

const SignOut = () => {
    const navigate = useNavigate();
    const {dispatch} = useUser();
    const handleSignOut = async() => {
        try {
            await signOut(auth)
            dispatch({type:"LOGOUT"})
            navigate('/')
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }
  return (
    <NavBtn onClick={handleSignOut}>Sign Out</NavBtn>
  )
}

export default SignOut