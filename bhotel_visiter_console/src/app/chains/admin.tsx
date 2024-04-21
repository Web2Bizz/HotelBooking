import {
  ApiPage,
  FooterPage,
  GeneralPage,
  HeaderPage,
  HomePage,
  MainPage,
  MenuPage,
} from "@pages";
import { AdminLayout } from "@ui";
import { RouteObject } from "react-router-dom";

export const adminRouter: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <AdminLayout>
            <HomePage />
          </AdminLayout>
        ),
      },
    ],
  },
  {
    path: "gui",
    children: [
      {
        path: "general",
        element: (
          <AdminLayout>
            <GeneralPage />
          </AdminLayout>
        ),
      },
      {
        path: "menu",
        element: (
          <AdminLayout>
            <MenuPage />
          </AdminLayout>
        ),
      },
      {
        path: "footer",
        element: (
          <AdminLayout>
            <FooterPage />
          </AdminLayout>
        ),
      },
      {
        path: "main",
        element: (
          <AdminLayout>
            <MainPage />
          </AdminLayout>
        ),
      },
      {
        path: "header",
        element: (
          <AdminLayout>
            <HeaderPage />
          </AdminLayout>
        ),
      },
    ],
  },
  {
    path: "system",
    children: [
      {
        path: "api",
        element: (
          <AdminLayout>
            <ApiPage />
          </AdminLayout>
        ),
      },
    ],
  },
];
