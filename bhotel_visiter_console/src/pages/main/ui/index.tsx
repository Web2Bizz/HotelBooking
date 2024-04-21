import { AdminPageTitle, CustomCheckbox } from "@widgets";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";

export const MainPage = () => {
  return (
    <>
      <AdminPageTitle title={"Главная страница"} />
      <form className="col-4">
        <h3>Приветствие</h3>
        <Dropdown
          className="col-12"
          placeholder="Выберете поведение фона"
          options={["Статичный фон", "Карусель"]}
        />
        <div className="my-5">
          <FloatLabel>
            <InputTextarea
              id="username"
              rows={5}
              cols={30}
              className="col-12"
            />
            <label htmlFor="username">Описание сайта</label>
          </FloatLabel>
        </div>
        <CustomCheckbox label="Отображать кнопку Забронировать отель" />
        <CustomCheckbox label="Отображать блок Сейчас популярно" />
        <CustomCheckbox label="Отображать блок Скидок" />
        <CustomCheckbox label="Отображать блок Часто задаваемые вопросы" />
        <Button label="Сохранить" severity="success" className="col-12 mt-3" />
      </form>
    </>
  );
};
