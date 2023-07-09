import {Routes, Route, Navigate} from 'react-router-dom'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import UserDashboard from './components/UserDashboard';
import Chat from './components/chat/Chat';
import { useUser } from './context/UserContext';
import NavBar from './components/NavBar';

function App() {
  const {currentUser} = useUser();

  const RequireAuth = ({children})=>{
    return currentUser? <>{children}</> : <Navigate to="/" />
  }
  return (
    <>
    <NavBar/>
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<RequireAuth><UserDashboard/></RequireAuth>}/>
        <Route path="/chat" element={<RequireAuth><Chat/></RequireAuth>} />
      </Routes>
    </div>
    </>
  )
}

export default App
