import { AdminPageTitle } from "@widgets";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

export const ApiPage = () => {
  return (
    <>
      <AdminPageTitle title={"настройки API"} />
      <form className="col-4">
        <h3>API административной части:</h3>
        <div className="my-3">
          <FloatLabel>
            <InputText id="username" className="col-12" />
            <label htmlFor="username">api ссылка</label>
          </FloatLabel>
        </div>
        <Button label="Проверить соединение" />
        <h3>API backend:</h3>
        <div className="my-3">
          <FloatLabel>
            <InputText id="username" className="col-12" />
            <label htmlFor="username">api ссылка</label>
          </FloatLabel>
        </div>
        <Button label="Проверить соединение" />
        <Button label="Сохранить" severity="success" className="col-12 mt-3" />
        <h3>Данные подключения к БД (Только для чтения):</h3>
        <div className="flex flex-column gap-2 my-3">
          <label htmlFor="username">Название:</label>
          <InputText readOnly id="username" aria-describedby="username-help" />
        </div>
        <div className="flex flex-column gap-2 my-3">
          <label htmlFor="username">Пользователь:</label>
          <InputText readOnly id="username" aria-describedby="username-help" />
        </div>
        <div className="flex flex-column gap-2 my-3">
          <label htmlFor="username">Хост:</label>
          <InputText readOnly id="username" aria-describedby="username-help" />
        </div>
        <div className="flex flex-column gap-2 my-3">
          <label htmlFor="username">Порт:</label>
          <InputText readOnly id="username" aria-describedby="username-help" />
        </div>
      </form>
    </>
  );
};
