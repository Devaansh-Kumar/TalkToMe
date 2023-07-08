import {Routes, Route, Navigate} from 'react-router-dom'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import { useUser } from './context/UserContext'

function App() {
  const {currentUser} = useUser();

  const RequireAuth = ({children})=>{
    return currentUser? <>{children}</> : <Navigate to="/signup" />
  }
  return (
    <>
      <div className="text-3xl font-bold underline">TalkToMe</div>
      <Routes>
        <Route path="/" element={<RequireAuth><Home/></RequireAuth>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App