import React, { useState } from 'react'
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