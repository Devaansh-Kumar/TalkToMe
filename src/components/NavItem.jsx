import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavItem = ({path,name}) => {
    const [classes,setClasses] = useState("")
    const location = useLocation();

    useEffect(()=>{
        setClasses(location.pathname == path? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700")
    },[location])
  return (
    <li>
    <Link to={path} className={classes}>{name}</Link>
    </li>  )
}

export default NavItem