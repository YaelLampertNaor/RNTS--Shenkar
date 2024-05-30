import React, { createContext, useEffect, useState } from 'react'
import { UserType } from '../Types/user';
import { Alert } from 'react-native';
import usersList from '../Data/users.json'

export const UserContext = createContext({});

export default function UserContextProvider({ children }: any) {
    const [allUsers, setAllUsers] = useState<UserType[]>(usersList);
    const [currentUser, setCurrentUser] = useState<UserType | undefined>();

    const AddUser = (user: UserType) => {
        try {
            setAllUsers([...allUsers, user]);
            Alert.alert("Success","User Added");
            return true;
        } catch (error) {
            Alert.alert("No Success","No User Added");
            return false;
        }
    }
    const EditUser = (user: UserType) => {
        const newList = allUsers.filter((u: UserType) => u.id !== user.id);
        setAllUsers([...newList, user]);
    }
    const DeleteUser = (user: UserType) => {
        const newList = allUsers.filter((u: UserType) => u.id !== user.id);
        setAllUsers([...newList]);
    }

    const Value = {
        allUsers, setAllUsers,
        currentUser, setCurrentUser,
        AddUser,
        EditUser,
        DeleteUser
    }
    return (
        <UserContext.Provider value={Value}>
            {children}
        </UserContext.Provider>
    )
}