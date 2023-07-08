import React from 'react'
import {auth} from '../../firebase'
import {signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const SignOut = () => {
    const navigate = useNavigate();
    const {dispatch} = useUser();
    const handleSignOut = async() => {
        try {
            await signOut(auth)
            dispatch({type:"LOGOUT"})
            navigate('/login')
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }
  return (
    <button onClick={handleSignOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Out</button>
  )
}

export default SignOut