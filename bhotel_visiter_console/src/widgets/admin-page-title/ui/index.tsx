type TAdminPAgeTitleProps = {
    title: string
}

export const AdminPageTitle = (props: TAdminPAgeTitleProps) => {

    const {title} = props

    return (
        <div className="flex align-items-center pt-4 flex-shrink-0">
            <span className="inline-flex align-items-center gap-2">
                <span className="font-semibold text-2xl text-primary">{title}</span>
            </span>
        </div>
    )
}