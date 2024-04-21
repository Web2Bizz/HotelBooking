import { InputSwitch } from "primereact/inputswitch";

type CustomCheckboxProps = {
  label: string;
};

export const CustomCheckbox = (props: CustomCheckboxProps) => {
  const { label } = props;

  return (
    <div className="flex row my-2">
      <InputSwitch className="mx-3" checked />
      {label}
    </div>
  );
};
