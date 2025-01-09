import { LucideIcon, PlaneTakeoff, Timer } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export const getAllMenuList = (pathname: string) => {
  const allMenus: Group[] = [
    {
      groupLabel: "Módulos",
      menus: [
        {
          href: "/mis-reservas",
          label: "Mis reservas",
          active: pathname.startsWith("/mis-reservas"),
          icon: Timer,
          submenus: [],
        },
        {
          href: "/vuelos",
          label: "Vuelos",
          active: pathname.startsWith("/vuelos"),
          icon: PlaneTakeoff,
          submenus: [],
        },
      ],
    },
  ];
  return allMenus;
};

export const getMenuList = (pathname: string): Group[] => {
  return getAllMenuList(pathname);
};
