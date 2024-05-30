import { DestinationType } from "./destination"
import {UserType} from "./user"

//-------------------------DESTINATIONS-------------------------

export type DestinationProps = {
    dest:DestinationType
}

export type DestinationsListProps = {
    destinations:DestinationType[]
}

//-------------------------USERS-------------------------

export type UserProps = {
    user:UserType
}

export type UserListProps = {
    users: UserType[]
}

export type AdminProps = {
    users:UserType[],
    dest:DestinationType[]
}
