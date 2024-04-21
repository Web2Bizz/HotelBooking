import { AdminPageTitle, CustomCheckbox } from "@widgets";
import { Button } from "primereact/button";

export const HeaderPage = () => {
  return (
    <>
      <AdminPageTitle title={"Шапка"} />
      <form className="col-4">
        <h3>Логотип и бренд</h3>
        <CustomCheckbox label="Отображать логотип" />
        <CustomCheckbox label="Отображать название" />
        <CustomCheckbox label="Отображать поиск" />
        <h3>Действие</h3>
        <CustomCheckbox label="Отображать кнопку Забронировать номер" />
        <h3>Аккаунт и пользователь</h3>
        <CustomCheckbox label="Отображать фамилию и имя для пользователей" />
        <Button label="Сохранить" severity="success" className="col-12 mt-3" />
      </form>
    </>
  );
};
