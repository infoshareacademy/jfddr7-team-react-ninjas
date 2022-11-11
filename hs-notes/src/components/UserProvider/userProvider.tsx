import { createContext, ReactElement, FC, useState } from 'react';

interface UserContextState {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
}

interface UserProviderProps {
    children: ReactElement;
}

const defaultUserContextValue = {} as UserContextState;
export const UserContext = createContext(defaultUserContextValue);

export const UserProvider: FC<UserProviderProps> =({children}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <UserContext.Provider value={{email, setEmail, password, setPassword, isAdmin, setIsAdmin}}>
            {children}
        </UserContext.Provider>
    )
}