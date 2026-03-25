import type { MenuCategory } from "./enum";

type Menu = {
  tabs: Tab[];
};

// type MenuCategory = {
//   name:  "operational" | "accounting" | "report" | "administrative";
// };

interface Tab  {
  // label: "operational" | "accounting" | "report" | "administrative";
  name: MenuCategory
  sections: Section[];
};

type Section = {
  name: string;
  groups: Group[];
};

type Group = {
  title: string;
  items: Item[];
};

type Item = {
  label: string;
  route: string;
};
