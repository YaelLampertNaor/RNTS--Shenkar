import React, { createContext, useEffect, useState } from 'react'
import { DestinationType } from '../Types/destination';
import destList from '../Data/destinations.json'
import { Alert } from 'react-native';

export const DestinationContext = createContext({});

export default function DestinationContextProvider({children}:any) {
    const [allDest, setAllDest] = useState<DestinationType[]>(destList);
    const [currentDest, setCurrentDest] = useState<DestinationType | undefined>();

    const AddDestination=(dest:DestinationType)=>{
        try {
            setAllDest([...allDest, dest]);
            Alert.alert("Success", "Destination added")
            return true;
        } catch (error) {
            Alert.alert("No Success", "No Destination Added")
            return false;
        }
    }
    const EditDestination=(dest:DestinationType)=>{
        const newList = allDest.filter((d)=>d.code !== dest?.code)
        setAllDest([...newList, dest]);
    }
    const DeleteDestination=(dest:DestinationType)=>{
        const newList = allDest.filter((d)=>d.code !== dest?.code)
        setAllDest([...newList]);
    }

    const Value = {
        allDest,
        setAllDest,
        currentDest,
        setCurrentDest,
        AddDestination,
        EditDestination,
        DeleteDestination
    }

    return (
        <DestinationContext.Provider value={Value}>
            {children}
        </DestinationContext.Provider>
    )
}