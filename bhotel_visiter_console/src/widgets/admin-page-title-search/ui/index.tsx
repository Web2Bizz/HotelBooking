import { InputText } from "primereact/inputtext"

type TAdminPageTitleSearch = {
    title: string
}

export const AdminPageTitleSearch = (props: TAdminPageTitleSearch) => {

    const {title} = props

    return (
        <div className="flex align-items-center pt-3 flex-shrink-0">
            <span className="inline-flex align-items-center gap-2">
                <span className="font-semibold text-2xl text-primary">{title}</span>
            </span>
            <span className="p-input-icon-left ml-7">
                <i className="pi pi-search" />
                <InputText placeholder="Поиск" />
            </span>
        </div>
    )
}