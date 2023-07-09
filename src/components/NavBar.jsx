
import { useUser } from '../context/UserContext';
import GoogleAuthBtn from './auth/GoogleAuthBtn';
import SignOut from './auth/SignOut';
import NavItem from './NavItem';

export default function NavBar() {
  const {currentUser} = useUser()
  return (

<nav className="bg-white dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="#" className="flex items-center">
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TalkToMe</span>
  </a>
  <div className="flex md:order-2">
      {currentUser? <SignOut/> : <GoogleAuthBtn/>}
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <NavItem path="/" name="Home" active/>
{   currentUser &&   <NavItem path="/dashboard" name="Dashboard"/>
}      <NavItem path="/about" name="About"/>
      <NavItem path="#" name="Github"/>
    </ul>
  </div>
  </div>
</nav>

  )
}

