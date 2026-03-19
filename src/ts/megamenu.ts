type Menu = {
  tabs: Tab[];
};

type MenuCategory = {
  name: undefined |"operational" | "accounting" | "report" | "administrative";
};

type Tab = {
  label: MenuCategory;
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
