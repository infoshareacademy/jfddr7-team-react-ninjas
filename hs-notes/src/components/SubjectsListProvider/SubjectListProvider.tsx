import { createContext, ReactElement, FC, useState } from 'react';

interface SubjectsListContextState {
    subjects: string[];
    setSubjects: (subjects: string[]) => void;
}

interface SubjectsListProviderProps {
    children: ReactElement;
}

const defaultUserContextValue = {} as SubjectsListContextState;
export const SubjectsListContext = createContext(defaultUserContextValue);

export const SubjectsListProvider: FC<SubjectsListProviderProps> =({children}) => {
    const [subjects, setSubjects] = useState([''])

    return (
        <SubjectsListContext.Provider value={{subjects, setSubjects}}>
            {children}
        </SubjectsListContext.Provider>
    )
}