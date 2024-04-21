export type TTour = {
    id: string
    name: string
    description: string
    city: string
    country: string
    tarifCount: number
}

export type TAddTourForm = Omit<TTour, 'id' | 'tarifCount'>