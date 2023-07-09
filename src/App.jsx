import {Routes, Route, Navigate} from 'react-router-dom'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import UserDashboard from './components/UserDashboard';
import Chat from './components/chat/Chat';
import { useUser } from './context/UserContext';
import NavBar from './components/NavBar';
import AboutUs from './components/about/AboutUs';

function App() {
  const {currentUser} = useUser();

  const RequireAuth = ({children})=>{
    return currentUser? <>{children}</> : <Navigate to="/" />
  }
  return (
    <>
    <NavBar/>
    <div className="mx-auto mt-20">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<RequireAuth><UserDashboard/></RequireAuth>}/>
        <Route path="/chat" element={<RequireAuth><Chat/></RequireAuth>} />
        <Route path="/about" element={<AboutUs/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
