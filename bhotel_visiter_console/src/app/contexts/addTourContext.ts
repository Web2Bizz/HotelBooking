import { createContext } from 'react'
import { Faq } from 'trpc-package'

type TContext = {
	fields: Array<Faq>
	setFields: (value: Array<Faq>) => void
}

export const AddPriceTourContext = createContext<TContext>({
	fields: [],
	setFields: () => {}
})
