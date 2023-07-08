import React from 'react'
import { useUser } from '../context/UserContext'
import SignOut from './auth/SignOut';

const Home = () => {
  const {currentUser} = useUser();
  return (
    <>
    <div>You are now signed in</div>
    <p>Hello {currentUser.name}!</p>
    <SignOut/>
    </>
  )
}

export default Home