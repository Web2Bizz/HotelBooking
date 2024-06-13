import { createContext } from "react"

export type TUserContext = {
    id_user: string
    name: string
    surname: string
    father_name: string
    email: string
    role: string
    phone?: string
    birthday: string
    isLoggined: boolean
    setUserData: (value: TUserContext) => void
}

export const initialUserData: TUserContext = {
    id_user: '',
    name: '',
    surname: '',
    father_name: '',
    email: '',
    role: '',
    phone: '',
    birthday: '',
    isLoggined: false,
    setUserData: () => {},
}

export const UserContext = createContext(initialUserData)