import { AdminPageTitle, CustomCheckbox } from "@widgets";
import { Button } from "primereact/button";
import { OrderList } from "primereact/orderlist";
import { useState } from "react";

export const MenuPage = () => {
  const [filterItems, setFilterItems] = useState<Array<string>>([
    "Item 1",
    "Item 2",
    "Item 3",
  ]);

  const itemTemplate = (item: string) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
          <span className="font-bold">{item}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <AdminPageTitle title={"Меню"} />
      <form className="col-4">
        <h3>Пункты фильтрации</h3>
        <div className="col-4 flex flex-column gap-2">
          <div className="card border-1">
            <CustomCheckbox label="Name" />
          </div>
          <div className="card border-1">
            <CustomCheckbox label="Name" />
          </div>
          <div className="card border-1">
            <CustomCheckbox label="Name" />
          </div>
        </div>
        <h3>Порядок пунктов меню фильтрации</h3>
        <div className="card">
          <OrderList
            dataKey="id"
            value={filterItems}
            onChange={(e) => setFilterItems(e.value)}
            itemTemplate={itemTemplate}
            header="Products"
            dragdrop
          ></OrderList>
        </div>
        <Button label="Сохранить" severity="success" className="col-12 mt-3" />
      </form>
    </>
  );
};
