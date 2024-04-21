import { AdminPageTitle, CustomCheckbox } from "@widgets";
import { SocialLink } from "./SocialLink";
import { Button } from "primereact/button";

export const FooterPage = () => {
  return (
    <>
      <AdminPageTitle title={"Футер"} />
      <form className="col-4">
        <h3>Логотип и бренд</h3>
        <CustomCheckbox label="Отображать логотип" />
        <CustomCheckbox label="Отображать название" />
        <CustomCheckbox label="Ссылки на социальные сети" />
        <h3>Социальные сети</h3>
        <div className="flex flex-column gap-2">
          <SocialLink
            domain={"https://vk.com/"}
            link={"group_name"}
            name={"ВКонтакте"}
          />
          <SocialLink
            domain={"https://t.me/"}
            link={"group_name"}
            name={"Телеграм"}
          />
        </div>
        <Button label="Сохранить" severity="success" className="col-12 mt-3" />
      </form>
    </>
  );
};
