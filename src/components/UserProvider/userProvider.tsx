import { createContext, ReactElement, FC, useState } from 'react';

interface UserContextState {
    userName: string;
    setUserName: (userName: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    avatar: string;
    setAvatar: (avatar: string) => void;
    school: string;
    setSchool: (school: string) => void;
}

interface UserProviderProps {
    children: ReactElement;
}

const defaultUserContextValue = {} as UserContextState;
export const UserContext = createContext(defaultUserContextValue);

export const UserProvider: FC<UserProviderProps> =({children}) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [school, setSchool] = useState("")
   

    return (
        <UserContext.Provider 
            value={{userName, setUserName, 
                    email, setEmail, 
                    password, setPassword, 
                    isAdmin, setIsAdmin, 
                    avatar, setAvatar, 
                    school, setSchool}}>
            {children}
        </UserContext.Provider>
    )
}