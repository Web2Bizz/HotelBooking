import { createContext } from 'react'

export type TStyleContext = {
	header_background: string
	footer_background: string
}

export const initialUserData: TStyleContext = {
	header_background: '',
	footer_background: ''
}

export const StyleContext = createContext(initialUserData)
