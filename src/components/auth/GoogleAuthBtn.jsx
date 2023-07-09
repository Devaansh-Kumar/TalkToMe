import { signInWithPopup } from 'firebase/auth'
import { collection ,getDoc,setDoc,doc} from 'firebase/firestore'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import {auth,db,provider} from '../../firebase'
import NavBtn from '../NavBtn'

const GoogleAuthBtn = () => {
    const {dispatch} = useUser();
    const navigate = useNavigate();

    const handleGoogleAuth = async ()=>{
        try {
            const res = await signInWithPopup(auth,provider)
            const user = res.user;
            console.log(user)
            const userDetails = {
                name: user.displayName,
                uid: user.uid,
                profile_pic: user.photoURL,
                email: user.email
            }
            const userSnap = await getDoc(doc(db,"users",user.uid));
            if(!userSnap.exists()){
                await setDoc(doc(collection(db,"users"),user.uid), userDetails);
            }
            dispatch({type:"LOGIN",payload:userDetails})
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }
  return (
    <NavBtn  onClick={handleGoogleAuth}>
        Sign In With Google
    </NavBtn>
  )
}

export default GoogleAuthBtn