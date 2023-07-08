import React, { useState } from 'react'
import {auth,db} from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {collection, doc, setDoc} from 'firebase/firestore'
import { useUser } from '../../context/UserContext'
import Spinner from '../Spinner'
import GoogleAuthBtn from './GoogleAuthBtn'

const Signup = () => {
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {dispatch} = useUser();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email,password);
      const user = res.user;
      const newUser = {
        uid: user.uid,
        name,
        email,
        profile_pic: `https://api.dicebear.com/6.x/avataaars/svg?seed=${user.uid}`
      }
      await setDoc(doc(collection(db, "users"),user.uid), newUser)
      dispatch({type:"LOGIN",payload: newUser})
      setLoading(false);
      navigate('/');

    } catch (error) {
      setLoading(false)
      console.log(error);
      alert(error.message)
    }
  }

  return (
    <div>
     {loading? <Spinner/> : null } 
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Name</label> <br />
            <input type="text" name="name"  className='border-solid border-2' onChange={(e)=> setName(e.currentTarget.value)}/>
        </div>
        <div>
          <label htmlFor="email">Email</label><br />
          <input type="email" name="email" className='border-solid border-2' onChange={(e)=> setEmail(e.currentTarget.value)}/>
        </div>
        <div>
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" className='border-solid border-2' onChange={(e)=> setPassword(e.currentTarget.value)}/>
        </div>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Sign Up</button>
      </form>
      <GoogleAuthBtn setLoading={setLoading}/>
    </div>
  )
}

export default Signup