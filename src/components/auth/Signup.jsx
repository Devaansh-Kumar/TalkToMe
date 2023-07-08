import React, { useState } from 'react'
import {auth,db} from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {collection, doc, setDoc} from 'firebase/firestore'
import { useUser } from '../../context/UserContext'
import Spinner from '../Spinner'
import GoogleAuthBtn from './GoogleAuthBtn'

const Signup = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
     {loading? <Spinner/> : null } 
      <GoogleAuthBtn setLoading={setLoading}/>
    </div>
  )
}

export default Signup