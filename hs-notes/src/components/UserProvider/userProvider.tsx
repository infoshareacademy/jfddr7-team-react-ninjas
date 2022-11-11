import { createContext, ReactElement, FC, useState } from 'react';

interface UserContextState {
    email: string;
    setEmail: (email: string) => void;
}

interface UserProviderProps {
    children: ReactElement;
}

const defaultUserContextValue = {} as UserContextState;
export const UserContext = createContext(defaultUserContextValue);

export const UserProvider: FC<UserProviderProps> =({children}) => {
    const [email, setEmail] = useState('')

    return (
        <UserContext.Provider value={{email, setEmail}}>
            {children}
        </UserContext.Provider>
    )
}