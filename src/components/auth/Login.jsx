import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { auth,db } from '../../firebase';
import GoogleAuthBtn from './GoogleAuthBtn';
import Spinner from '../Spinner';

const Login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const {dispatch} = useUser();
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      const res = await signInWithEmailAndPassword(auth, email,password);
      const user = res.user;
      console.log(user);
      const userSnap = await getDoc(doc(db,"users",user.uid))
      dispatch({type:"LOGIN",payload: userSnap.data()})
      setLoading(false)
      navigate('/');

    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.message)
    }
  }

  return (
    <div>
      {loading? <Spinner/> : null}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label><br />
          <input type="email" name="email" className='border-solid border-2' onChange={(e)=> setEmail(e.currentTarget.value)}/>
        </div>
        <div>
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" className='border-solid border-2' onChange={(e)=> setPassword(e.currentTarget.value)}/>
        </div>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login</button>
      </form>
      <GoogleAuthBtn setLoading={setLoading}/>
    </div>
  )
}

export default Login