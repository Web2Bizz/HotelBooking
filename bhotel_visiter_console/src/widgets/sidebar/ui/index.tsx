import { useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/Ripple";
import { StyleClass } from "primereact/StyleClass";
import { SideBarItem } from "./../../sidebar-item";

export function SideBar() {
  const btnRef1 = useRef(null);
  const btnRef5 = useRef(null);

  return (
    <div className="min-h-screen flex fixed col-2 p-0 surface-ground">
      <div
        id="app-sidebar-2"
        className="surface-section h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none col-12"
      >
        <div className="flex flex-column h-full">
          <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
            <span className="inline-flex align-items-center gap-2">
              <span className="font-semibold text-2xl text-primary">
                Админ. Панель
              </span>
            </span>
          </div>
          <div className="overflow-y-auto">
            <ul className="list-none p-3 m-0">
              <li>
                <StyleClass
                  nodeRef={btnRef1}
                  selector="@next"
                  enterClassName="hidden"
                  enterActiveClassName="slidedown"
                  leaveToClassName="hidden"
                  leaveActiveClassName="slideup"
                >
                  <div
                    ref={btnRef1}
                    className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer"
                  >
                    <span className="font-medium">Интерфейс</span>
                    <i className="pi pi-chevron-down"></i>
                    <Ripple />
                  </div>
                </StyleClass>
                <ul className="list-none p-0 m-0 overflow-hidden">
                  <li>
                    <SideBarItem
                      iconClass=""
                      navigatePath="/gui/general"
                      label="Основное"
                    />
                  </li>
                  <li>
                    <SideBarItem
                      iconClass=""
                      navigatePath="/gui/header"
                      label="Шапка"
                    />
                  </li>
                  <li>
                    <SideBarItem
                      iconClass=""
                      navigatePath="/gui/menu"
                      label="Меню"
                    />
                  </li>
                  <li>
                    <SideBarItem
                      iconClass=""
                      navigatePath="/gui/footer"
                      label="Футер"
                    />
                  </li>
                  <li>
                    <SideBarItem
                      iconClass=""
                      navigatePath="/gui/main"
                      label="Главная страница"
                    />
                  </li>
                </ul>
              </li>
              <li>
                <StyleClass
                  nodeRef={btnRef5}
                  selector="@next"
                  enterClassName="hidden"
                  enterActiveClassName="slidedown"
                  leaveToClassName="hidden"
                  leaveActiveClassName="slideup"
                >
                  <div
                    ref={btnRef5}
                    className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer"
                  >
                    <span className="font-medium">Система</span>
                    <i className="pi pi-chevron-down"></i>
                    <Ripple />
                  </div>
                </StyleClass>
                <ul className="list-none p-0 m-0 overflow-hidden">
                  <li>
                    <SideBarItem
                      iconClass=""
                      navigatePath="/system/api"
                      label="API"
                    />
                  </li>
                  <li>
                    <SideBarItem
                      iconClass=""
                      navigatePath="/system/state"
                      label="Состояние системы"
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
            <a className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                shape="circle"
              />
              <span className="font-bold">Администратор</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
