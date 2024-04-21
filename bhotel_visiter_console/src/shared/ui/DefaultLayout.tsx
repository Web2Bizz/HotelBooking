import { ReactNode } from "react"

export const DefaultLayout = (props: { children: ReactNode }) => {

    const {children} = props

    return (
        <div className='w-max'>{children}</div>
    )
}