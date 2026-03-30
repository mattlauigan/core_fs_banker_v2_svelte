import type { MenuCategory } from "./enum";

export type MenuState = {
  category: MenuCategory;
  root: string | null;
  online: boolean
};

