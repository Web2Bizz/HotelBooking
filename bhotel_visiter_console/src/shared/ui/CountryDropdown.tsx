import { TCountry } from "@entities";
import { useEffect, useState } from "react";
import { countryApi } from "@api";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

type TCountryDropdownProps = {
    fieldValue: string
    onChange?: (e: DropdownChangeEvent) => void
}

export const CountryDropdown = (props: TCountryDropdownProps) => {

    const {fieldValue, onChange} = props

    const [countries, setCountries] = useState<Array<TCountry>>([]);

    useEffect(() => {
        setCountries(countryApi.getAll())
    }, [])
    
    return (
        <Dropdown
            value={fieldValue}
            onChange={onChange}
            options={countries}
            optionLabel="name"
            placeholder="Выберете страну"
            className="w-12" />
    )
}