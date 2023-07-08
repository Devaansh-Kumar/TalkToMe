import React, {createContext, useContext, useEffect, useReducer} from "react";
import UserReducer from "./UserReducer";

const INTIAL_STATE = { 
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
}
const UserContext = createContext(INTIAL_STATE)

export const useUser = () => {
    return useContext(UserContext)
}

const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(UserReducer,INTIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.currentUser))
    },[state.currentUser])

    return (
        <UserContext.Provider value={{currentUser: state.currentUser, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider