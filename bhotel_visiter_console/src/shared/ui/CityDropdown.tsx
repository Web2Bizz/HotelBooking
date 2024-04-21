import { TCity } from "@entities";
import { useEffect, useState } from "react";
import { cityApi } from "@api";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

type TCityDropdownProps = {
    fieldValue: string
    onChange?: (e: DropdownChangeEvent) => void
}

export const CityDropdown = (props: TCityDropdownProps) => {

    const {fieldValue, onChange} = props

    const [cities, setCities] = useState<Array<TCity>>([]);

    useEffect(() => {
        setCities(cityApi.getAll())
    }, [])
    
    return (
        <Dropdown
            value={fieldValue}
            onChange={onChange}
            options={cities}
            optionLabel="name"
            placeholder="Выберете город"
            className="w-12" />
    )
}