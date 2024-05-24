import { createContext } from "react"

export type TUserContext = {
    name: string
    surname: string
    fatherName: string
    email: string
    avatar: string
    role: string
}

export const initialUserData: TUserContext = {
    name: 'Николай',
    surname: 'Николаев',
    fatherName: 'Ниволаевич',
    email: 'nikola@gmail.com',
    role: 'Гость',
    avatar: 'https://webgradients.com/public/webgradients_png/022%20Morpheus%20Den.png'
}

export const UserContext = createContext(initialUserData)