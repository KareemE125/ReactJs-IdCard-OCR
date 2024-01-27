import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import IdData from '../models/IdData';

// Initial data
const initIdData: IdData = {
    imageUrl: null,
    imageName: null,
    surname: null,
    docNo: null,
    givenName: null,
    dateOfIssue: null,
    dateOfBirth: null,
    dateOfExpiry: null,
    nationality: null,
    sex: null
}

export const IdDataContext = createContext<any>(null);


export default function IdDataContextProvider({ children } : { children: ReactNode }){

    const [idData, setIdData] = useState<IdData>(initIdData);
    
    // ***Uncomment to persist data in local storage***
    // useEffect(() => {
    //     const idDataFromLocalStorage = localStorage.getItem('idData');
    //     if (idDataFromLocalStorage) {
    //         setIdData(JSON.parse(idDataFromLocalStorage));
    //     }
    // }, []);
    
    const updateIdData = (newIdData: IdData) => {
        //localStorage.setItem('idData', JSON.stringify(newIdData));
        setIdData(newIdData);
    }

    return <IdDataContext.Provider value={{idData, updateIdData}}>
        {children}
    </IdDataContext.Provider>

}

type IdDataContextType = {
    idData: IdData,
    updateIdData: (newIdData: IdData) => void
}

export const useIdDataContext = () => {
    const context = useContext<IdDataContextType | null>(IdDataContext);
    if (!context) {
        throw new Error('useIdDataContext must be used within an IdDataContextProvider');
    }
    return context;
}